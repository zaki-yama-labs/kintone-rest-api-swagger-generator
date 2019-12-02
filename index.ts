import ora from "ora";

import { fetchKintoneAPISchemas } from "./src/fetch-kintone-api-schemas";
import { generateOpenAPISchema } from "./src/generate-openapi-schema";

const spinner = ora("Fetching kintone REST API Schemas...").start();
fetchKintoneAPISchemas();

spinner.text = "Generating OpenAPI Schema file...";
generateOpenAPISchema();
spinner.succeed("Successfully generated src/generated/openapi.yaml");
