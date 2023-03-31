import glob
import json
import os

SCHEMA_ROOT = "../../src/main/resources/schema"

DEFAULT_CONFIG = {
    "template-name": "default",
    "version": {"integration": "0.1.0", "schema": "1.0.0", "resource": "^1.23.0"},
    "description": "",
    "identification": "",
    "catalog": "observability",
    "components": [],
    "collection": [],
    "repository": {"url": "https://example.com/"},
}

SCHEMAS = {}

# For now, assume we're running in the current relative directory
if os.path.isdir(SCHEMA_ROOT):
    for filename in glob.glob(os.path.join(SCHEMA_ROOT, "**/*.schema"), recursive=True):
        schema_name = os.path.split(filename)[1]
        with open(filename, "r", encoding="utf-8") as schema_file:
            SCHEMAS[schema_name] = json.load(schema_file)
