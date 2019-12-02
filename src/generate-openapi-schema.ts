import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export function generateOpenAPISchema() {
  const kintoneAPISchemas = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "generated", "kintone-api-schemas.json"),
      "utf8"
    ),
    (key, value) => {
      if (key === "$ref") {
        return `#/components/schemas/${value}`;
      }
      return value;
    }
  );

  const json = {
    openapi: "3.0.1",
    info: {
      description: "Kintone REST API",
      version: "1.0.0",
      title: "Kintone REST API"
    }
  };
  const paths = generatePaths(kintoneAPISchemas);
  console.dir(paths, { depth: 100 });
  const components = generateComponents(kintoneAPISchemas);
  console.dir(components, { depth: 100 });
  // @ts-ignore
  json.paths = paths;
  // @ts-ignore
  json.components = components;

  fs.writeFileSync(
    path.resolve(__dirname, "generated", "openapi.yaml"),
    yaml.safeDump(json)
  );
}

function generatePaths(kintoneAPISchemas: any[]) {
  const paths: any = {};
  kintoneAPISchemas.forEach(schema => {
    const key = `/${schema.id}`;
    console.log(key);
    paths[key] = {
      [schema.httpMethod.toLowerCase()]: {
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: schema.response
              }
            }
          }
        }
      }
    };
  });
  return paths;
}

function generateComponents(kintoneAPISchemas: any) {
  let schemas = {};
  kintoneAPISchemas.forEach((schema: any) => {
    schemas = {
      ...schema.schemas,
      ...schemas
    };
  });
  return { schemas };
}

generateOpenAPISchema();
