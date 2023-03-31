from returns.result import Result, Failure, safe
import jsonschema

from .constants import SCHEMAS


@safe(exceptions=(
    jsonschema.exceptions.ValidationError,
    jsonschema.exceptions.SchemaError,
))
def validate_instance(instance: dict, schema: dict) -> dict:
    jsonschema.validate(instance, schema)
    return instance


def validate_config(config: dict) -> Result[dict, Exception]:
    try:
        return validate_instance(config, SCHEMAS["integration.schema"])
    except KeyError as err:
        return Failure(err)
