import jsonschema
from returns.result import Failure, Result, safe
from returns.pipeline import is_successful
import os

from .constants import SCHEMAS


@safe(
    exceptions=(
        jsonschema.exceptions.ValidationError,
        jsonschema.exceptions.SchemaError,
    )
)
def validate_instance(instance: dict, schema: dict) -> dict:
    jsonschema.validate(instance, schema)
    return instance


def validate_config(config: dict, name: str) -> Result[dict, Exception]:
    try:
        result = validate_instance(config, SCHEMAS["integration.schema"])
        if not is_successful(result):
            return result
        # TODO assumes component is named same thing as mapping
        # This is not true for e.g. logs
        # Need to load catalog to see what the expected name is
        
        # for component in config["components"]:
        #     path = os.path.join(f"integrations/{name}/schema", f"{component}.mapping")
        #     if not os.path.exists(path):
        #         return Failure(FileNotFoundError(f"Component `{component}` is absent from schema"))
        return result
    except KeyError as err:
        return Failure(err)


def validate_catalog(catalog: dict) -> Result[dict, Exception]:
    try:
        return validate_instance(catalog, SCHEMAS["catalog.schema"])
    except KeyError as err:
        return Failure(err)
