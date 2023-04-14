import json
import os
import re
from copy import deepcopy
from urllib import parse
import click
import requests
from termcolor import colored

from .constants import DEFAULT_CONFIG
from .validate import validate_config


class IntegrationBuilder:
    def __init__(self):
        self.path = None
        self.config = deepcopy(DEFAULT_CONFIG)
        self.dashboards = []
        self.mappings = dict()

    def with_name(self, name: str) -> "IntegrationBuilder":
        self.config["template-name"] = name
        return self

    def with_path(self, path: str) -> "IntegrationBuilder":
        self.path = path
        return self

    def with_schema_version(self, version: str) -> "IntegrationBuilder":
        if not re.match(r"^\d+\.\d+\.\d+", version):
            raise ValueError("Invalid version")
        self.config["version"]["schema"] = version
        return self

    def with_resource_version(self, version: str) -> "IntegrationBuilder":
        if not re.match(r"^\^?\d+\.\d+\.\d+", version):
            raise ValueError("Invalid version")
        self.config["version"]["resource"] = version
        return self

    def with_description(self, desc: str) -> "IntegrationBuilder":
        self.config["description"] = desc
        return self

    def with_repository(self, repo_url: str) -> "IntegrationBuilder":
        if repo_url.strip() == "":
            return self
        if not parse.urlparse(repo_url, allow_fragments=False):
            raise ValueError("Invalid URL")
        self.config["repository"]["url"] = repo_url
        return self

    def with_component(self, component: dict) -> "IntegrationBuilder":
        ## TODO make robust
        self.config["components"] = sorted(
            set(self.config["components"]) | {component["component"]}
        )
        url = (
            component["url"]
            .replace("github.com", "raw.githubusercontent.com")
            .replace("/tree", "")
            + ".mapping"
        )
        try:
            mapping = requests.get(url).json()
            self.mappings[url.split("/")[-1]] = mapping
        except requests.exceptions.ConnectionError:
            click.echo(
                colored(
                    "Network error while pulling component mapping, manual install needed",
                    "red",
                )
            )
        return self

    def with_dashboard(self, component: str) -> "IntegrationBuilder":
        ## TODO make robust
        self.dashboards.append(component)
        return self

    def build(self):
        assert self.path is not None
        os.makedirs(self.path, exist_ok=True)
        files = {"config.json": validate_config(self.config).unwrap()}
        for fname, mapping in self.mappings.items():
            files[f"schema/{fname}"] = mapping  # TODO validate
        for filename, data in files.items():
            with open(os.path.join(self.path, filename), "w", encoding="utf-8") as file:
                json.dump(data, file, ensure_ascii=False, indent=2)
        for dashboard in self.dashboards:
            with open(dashboard, "r") as fin:
                with open(
                    os.path.join(self.path, "assets/display", dashboard.split("/")[-1]),
                    "w",
                ) as fout:
                    fout.write(fin.read())
