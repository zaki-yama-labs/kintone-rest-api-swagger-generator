import { fetchKintoneAPISchemas } from "./src/fetch-kintone-api-schemas";
import { generateOpenAPISchema } from "./src/generate-openapi-schema";

console.log("Fetching kintone REST API Schemas...");
fetchKintoneAPISchemas();
console.log("Done.");

console.log("Generating OpenAPI Schema file...");
generateOpenAPISchema();
console.log("Done.");
