kintone OpenAPI Spec Generator
==============================

Generate OpenAPI Specification document from kintone's REST API Schemas.  
It can also launch REST API document server and mock server.

## Installation

```
$ npm install
```

## Usage

```zsh
# Fetch kintone's REST API Schemas and generate OpenAPI Spec document.
# It generates `src/generated/kintone-api-schemas.json` and `src/generated/openapi.yaml`.
$ npm run generate

# Run REST API document server (http://localhost:3000)
$ npm run doc

# Run mock server (http://localhost:4010)
$ npm run mock
```
