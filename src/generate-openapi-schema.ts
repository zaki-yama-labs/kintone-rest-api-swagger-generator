import fs from "fs";
import path from "path";
import prettier from "prettier";

export function generateOpenAPISchema() {
  const kintoneAPISchema = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "generated", "kintone-api-schemas.json"),
      "utf8"
    )
  );

  const json = {
    openapi: "3.0.1",
    info: {
      description: "Kintone REST API",
      version: "1.0.0",
      title: "Kintone REST API"
    }
  };
  const paths = generatePaths(kintoneAPISchema);
  console.dir(paths, { depth: 100 });
  const components = generateComponents(kintoneAPISchema);
  console.dir(components, { depth: 100 });
  // @ts-ignore
  json.paths = paths;
  // @ts-ignore
  json.components = components;
  fs.writeFileSync(
    path.resolve(__dirname, "generated", "openapi.json"),
    prettier.format(JSON.stringify(json), { parser: "json" })
  );
}

function generatePaths(kintoneAPISchema: any) {
  const key = `/${kintoneAPISchema.id}`;
  console.log(kintoneAPISchema.id);
  return {
    [key]: {
      [kintoneAPISchema.httpMethod.toLowerCase()]: {
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: kintoneAPISchema.response
              }
            }
          }
        }
      }
    }
  };
}

function generateComponents(kintoneAPISchema: any) {
  return {
    schemas: kintoneAPISchema.schemas
  };
}
generateOpenAPISchema();
