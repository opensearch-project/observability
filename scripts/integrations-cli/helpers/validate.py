import logging

import jsonschema

from .constants import SCHEMAS


def validate_config(config: dict) -> dict:
    if "integration.schema" in SCHEMAS:
        jsonschema.validate(instance=config, schema=SCHEMAS["integration.schema"])
    else:
        raise ValueError("integration.schema does not exist")
    return config
