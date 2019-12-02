import fs from "fs";
import path from "path";
import jsyaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import express from "express";

const spec = fs.readFileSync(
  path.resolve(__dirname, "generated", "openapi.yaml"),
  "utf8"
);
const doc = jsyaml.safeLoad(spec);
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(doc));

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
