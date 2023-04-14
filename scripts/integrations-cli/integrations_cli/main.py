#!./venv/bin/python3
import json
import os
import zipfile

import click
from returns.pipeline import is_successful
from returns.result import Result
from termcolor import colored

import helpers

available_templates = {
    "log": "template-dashboards/logs.ndjson"
}


@click.group()
def integrations_cli():
    """Create and maintain Integrations for the OpenSearch Integrations Plugin."""


def do_add_component(builder: helpers.IntegrationBuilder) -> bool:
    """Start an interactive session for"""
    manager = helpers.CatalogManager()
    choices = {}
    for category in manager.catalog["categories"]:
        click.echo(f"- {colored(category['category'], color='light_blue')}")
        for component in category["components"]:
            desc = component["description"]
            desc = desc if len(desc) < 50 else desc[:47] + "..."
            click.echo(f"  - {colored(component['component'], 'light_yellow')}: {desc}")
            choices[component["component"]] = component
    component = click.prompt(
        "Select component", type=click.Choice(list(choices)), show_choices=False
    )
    builder = builder.with_component(choices[component])
    if component in available_templates:
        if click.prompt(
            f"A pre-made template dashboard for component `{component}` was detected. Include it? (y/n)",
            type=click.Choice(["y", "n"], False),
            show_choices=False
        ) == "y":
            builder.with_dashboard(available_templates[component])
    return (
        click.prompt(
            "Configure another component? (y/n)",
            type=click.Choice(["y", "n"], False),
            show_choices=False,
        )
        == "y"
    )


@integrations_cli.command()
@click.argument("name")
def create(name: str):
    """Create a new Integration from a specified template."""
    click.echo(f"Creating new integration '{name}'")
    integration_path = os.path.join(os.getcwd(), "integrations", name)
    if os.path.exists(integration_path) and len(os.listdir(integration_path)) != 0:
        raise click.ClickException(
            f"destination path '{integration_path}' exists and is non-empty"
        )
    for subdir in ["assets", "schema", "assets/display"]:
        os.makedirs(os.path.join(integration_path, subdir))
    builder = helpers.IntegrationBuilder().with_name(name).with_path(integration_path)
    click.prompt("Schema version", default="1.0.0", type=builder.with_schema_version)
    click.prompt("Resource version", type=builder.with_resource_version)
    click.prompt("Integration description", default="", type=builder.with_description)
    builder.with_catalog(
        click.prompt(
            "Integration catalog", type=click.Choice(["observability", "security"])
        )
    )
    click.prompt(
        "Integration Repository URL",
        default="file://" + integration_path,
        type=builder.with_repository,
    )
    add_component = (
        click.prompt(
            "Would you like to configure components interactively? (y/n)",
            type=click.Choice(["y", "n"], False),
            show_choices=False,
        )
        == "y"
    )
    while add_component:
        add_component = do_add_component(builder)
    builder.build()
    click.echo(colored(f"Integration created at '{integration_path}'", "green"))


def validate_component(path: str, validator) -> Result[dict, Exception]:
    with open(path, "r", encoding="utf-8") as item_data:
        loaded = json.load(item_data)
        result = validator(loaded)
        if not is_successful(result):
            msg = str(result.failure)
            msg = ("> " + msg).replace("\n", "\n> ")
            click.echo(colored(msg, "red"), err=True)
        return result


def full_integration_is_valid(name: str) -> bool:
    integration_path = os.path.join(os.getcwd(), "integrations", name)
    integration_parts = {"config.json": helpers.validate.validate_config}
    encountered_errors = False
    for item, validator in integration_parts.items():
        item_path = os.path.join(integration_path, item)
        if not is_successful(validate_component(item_path, validator)):
            encountered_errors = True
    return not encountered_errors


@integrations_cli.command()
@click.argument("name")
def check(name: str):
    """Analyze the current Integration and report errors."""
    click.echo(f"Checking integration '{name}'")
    if full_integration_is_valid(name):
        click.echo(colored("Integration is valid", "green"))


@integrations_cli.command()
@click.argument("name")
def package(name: str):
    """Package the current integration for use in OpenSearch."""
    click.echo(f"Checking integration '{name}'")
    if not full_integration_is_valid(name):
        return
    click.echo(f"Packaging integration '{name}'")
    os.makedirs("artifacts", exist_ok=True)
    integration_path = os.path.join(os.getcwd(), "integrations", name)
    artifact_path = os.path.join("artifacts", f"{name}.zip")
    with zipfile.ZipFile(artifact_path, "w") as zf:
        for _, dirnames, filenames in os.walk(integration_path):
            for item in dirnames + filenames:
                zf.write(os.path.join(integration_path, item), arcname=item)
    click.echo(colored(f"Packaged integration as '{artifact_path}'", "green"))


if __name__ == "__main__":
    integrations_cli()
