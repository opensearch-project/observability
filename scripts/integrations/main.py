import typer
import configparser
import json
import os
import sys
import shutil
from rich import print

app = typer.Typer()
dirs = ["assets", "info", "samples", "schema", "test"]


def createIntegrationDirs(directory, force):
    if os.path.isdir(directory):
        if force:
            force = typer.confirm(
                f"Are you sure you want to delete {directory}?")
            if force:
                shutil.rmtree(directory)
                os.makedirs(directory)
                for dir in dirs:
                    os.makedirs(os.path.join(directory, dir))
        else:
            print(f"[red]Directory {directory} already exists[/red]")
            sys.exit(1)
    else:
        os.makedirs(directory)
        for dir in dirs:
            os.makedirs(os.path.join(directory, dir))


def populateDefaultVars(var_name):
    config = configparser.ConfigParser()
    config.read('config.ini')
    return (config.get("DEFAULT", var_name))


def generateJson(directory, integration_name, integration_desc, schema, license):
    data = {
        "name": integration_name,
        "version": {
            "integ": "0.1.0",
            "schema": schema,
            "resource": "^1.23.0",
            "license": license
        },
        "description": integration_desc,
        "identification": "instrumentationScope.attributes.identification",
        "categories": [],
        "collection": [{}],
        "repo": {
            "github": "https://github.com/opensearch-project/observability/tree/main/integrarions/"+integration_name
        }}

    with open(os.path.join(directory, "config.json"), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


def error(txt):
    print(txt)
    sys.exit(1)


def main(
        integration_name: str = typer.Option(
            "", "--name", "-n", help="Your new integration name"),
        integration_desc: str = typer.Option(
            "", "--description", "-d", help="Your new integration description"),
        license: str = typer.Option(populateDefaultVars(
            "LICENSE"), "--license", "-l", help="Opensource license (e.g. Apache, MIT)"),
        data_source: str = typer.Option(
            "", "--data-source", "-s", help="The data source to ingest from, as well as which version(s) to support."),
        schema: str = typer.Option(
            "", "--schema", "-s", help="Which schema, and at which version, to use. The data will be ingested with this schema."),
        catalog: str = typer.Option(
            "", "--catalog", "-c", help="The specific catalog to target, such as `observability` or `security`."),
        force: bool = typer.Option(
            False, "--force", "-f", help="Force integration directoy removal and recreation")
):

    directory = integration_name.lower().replace("_", "-")

    createIntegrationDirs(directory, force)

    generateJson(directory,
                 integration_name,
                 integration_desc,
                 schema, license)


if __name__ == "__main__":
    if len(sys.argv) <= 1:
        typer.run(
            error("No options has been provided\nIf unsure, run again with --help\n"))
    else:
        typer.run(main)
