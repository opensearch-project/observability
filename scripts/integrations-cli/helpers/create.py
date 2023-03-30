import json
import os
from urllib import parse
from copy import deepcopy

from .constants import DEFAULT_CONFIG
from .validate import validate_config
import re


class IntegrationBuilder:
    def __init__(self):
        self.path = None
        self.config = deepcopy(DEFAULT_CONFIG)

    def with_name(self, name: str) -> "IntegrationBuilder":
        self.config["template-name"] = name
        return self

    def with_path(self, path: str) -> "IntegrationBuilder":
        self.path = path
        self.config["repository"]["url"] = f"file://{path}"
        return self
    
    def with_schema_version(self, version: str) -> "IntegrationBuilder":
        if not re.match(r"^\d+\.\d+\.\d+", version):
            raise ValueError("Invalid version")
        self.config["version"]["schema"] = version

    def with_resource_version(self, version: str) -> "IntegrationBuilder":
        if not re.match(r"^\^?\d+\.\d+\.\d+", version):
            raise ValueError("Invalid version")
        self.config["version"]["resource"] = version

    def with_description(self, desc: str) -> "IntegrationBuilder":
        self.config["description"] = desc
    
    def with_catalog(self, catalog: str) -> "IntegrationBuilder":
        self.config["catalog"] = catalog
    
    def with_repository(self, repo_url: str) -> "IntegrationBuilder":
        if not parse.urlparse(repo_url):
            raise ValueError("Invalid URL")
        self.config["repository"]["url"] = repo_url

    def build(self):
        assert self.path is not None
        os.makedirs(self.path, exist_ok=True)
        files = {"config.json": validate_config(self.config)}
        for filename, data in files.items():
            with open(os.path.join(self.path, filename), "w") as file:
                json.dump(data, file, ensure_ascii=False, indent=2)
