# Integrations CLI

## Description

This is a CLI tool for creating, validating, and maintaining OpenSearch Dashboard Integrations.
The tool has three main functions:

- `create` a new integration with a specified configuration.
- `check` an integration for validity
- `package` an integration to be upload to an OpenSearch Integrations instance

## Installation

The project is managed with [Poetry](https://python-poetry.org/).
After installing Poetry, install dependencies:

```sh
$ poetry install
Installing dependencies from lock file
```

## Usage

The CLI can be run with:

```sh
$ poetry run cli
Usage: cli.cmd [OPTIONS] COMMAND [ARGS]...
```

If you don't want to prefix everything 

## Development

For development, there are a few scripts to help:

```sh
$ poetry run test
...
OK

$ poetry run format
...
All done!
```

## License

This project, like the rest of the OpenSearch projects, is licensed under the Apache 2.0 License.
