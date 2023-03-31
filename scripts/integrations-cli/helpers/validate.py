import jsonschema
from returns.result import Failure, Result, safe

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


def validate_config(config: dict) -> Result[dict, Exception]:
    try:
        return validate_instance(config, SCHEMAS["integration.schema"])
    except KeyError as err:
        return Failure(err)


def validate_catalog(catalog: dict) -> Result[dict, Exception]:
    try:
        return validate_instance(catalog, SCHEMAS["catalog.schema"])
    except KeyError as err:
        return Failure(err)
