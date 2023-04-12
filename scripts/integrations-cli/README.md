# Integrations CLI

## Description

This is a CLI tool for creating, validating, and maintaining OpenSearch Dashboard Integrations.
The tool has three main functions:

- `create` a new integration with a specified configuration.
- `check` an integration for validity
- `package` an integration to be upload to an OpenSearch Integrations instance

Further information is provided in the `Usage` section.

## Installation

The project requires Python 3.7 or better.
As the project is not yet a full Python package, it must be installed manually.
To manually install, create a virtual environment and install the requirements.

On Unix:

```bash
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip install -r requirements.txt
```

On Windows:

```ps1
> python -m venv venv
> ./venv/Scripts/activate.ps1
> pip install -r requirements.txt
```

On Unix, the script `integ-cli` that will automatically install necessary dependencies.

```bash
$ ./integ-cli
```

## Usage

On Unix, the CLI is callable with the included `integ-cli` script.
The simplest way to start making an integration is via `create`.

```bash
$ ./integ-cli --help
```

Further development instructions are provided below.

### What's in an Integration?

An integration typically consists of three components:

- A Config file
- Schemas
- Assets

The Config file `config.json` defines parameters for the integration.
Most notably, the versions of all involved dependencies.
It also has information like a description,
which is used when presenting the integration in the catalog.

The Schemas `/schema` are the rules for the data, and define the permitted fields and types.
During integration creation, they are provided based on the selected components.
These are typically not meant to be changed.

The Assets `/assets` are the "heart" of the integration.
They contain the bulk of what you develop.
All developed Assets should be compatible with the provided components.
Saved Objects, such as schemas and dashboards, are saved under `/assets/display`.

### How to Install an Integration

First, generate a template with desired defaults.

```bash
$ ./integ-cli create [NAME]
```

To begin using the integration, first load the templates in `schema`.
The loading order generally depends on dependencies, look for a `composed_of` field.
Dependencies are loaded by uploading them to a running OpenSearch cluster.
For example, to load the `http` component under an `nginx` integration:

```bash
$ curl -XPUT localhost:9200/_component_template/http_template  -H "Content-Type: application/json" --data-binary "@integrations/nginx/schema/http.mapping"
```

If the component contains an `index_mapping`,
then instead post it as an index template, e.g. with `logs`:

```bash
$ curl -XPUT localhost:9200/_index_template/logs  -H "Content-Type: application/json" --data-binary "@integrations/nginx/schema/logs.mapping"
```

Now we turn to OpenSearch Dashboards.
First is an index pattern, which defines where to find the data.
This should generally match the pattern `ss4o_*`.

```bash
$ curl -XPOST localhost:5601/api/saved_objects/index-pattern/sso_logs -H 'osd-xsrf: true'  -H 'Content-Type: application/json' -d '{ "attributes": { "title": "sso_logs-*-*",  "timeFieldName": "@timestamp" } }'
```

Finally, load the saved objects under `/assets/display`:

```bash
curl -XPOST "localhost:5601/api/saved_objects/_import?overwrite=true" -H "osd-xsrf: true" --form file=@integrations/nginx/assets/display/http.ndjson
```

We are aware that this is a complicated process.
We're working on it.

### How to Develop an Integration

Once the saved objects have been loaded,
you can freely change the relevant dashboards within the OpenSearch Dashboards UI.
To update the Display Assets,
export the new dashboards and replace the `.ndjson` files as desired.

If you need to add another `schema`,
add it to the `config.json` and add the mapping to the `/schema` directory.
This is also going to be automated in the future.

## Development

Running the tests:

```bash
$ python -m unittest
```

Formatting:

```bash
$ black .
```

## License

This project, like the rest of the OpenSearch projects, is licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0.html).
