import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import prettier from "prettier";

const subdomain = process.env.KINTONE_SUBDOMAIN;

(async () => {
  const baseUrl = `https://${subdomain}.cybozu.com/k/v1`;

  // TODO: fetch all of kintone REST apis
  // const resp = await fetch(`${baseUrl}/apis.json`);
  // const apis: Apis = (await resp.json()).apis;

  // const fetchSchemasPromises = Object.values(apis).map(async api => {
  //   const resp: any = await fetch(`${baseUrl}/${api.link}`);
  //   return resp.json();
  // });
  //
  // const schemas = await Promise.all(fetchSchemasPromises);

  const schemas = await (
    await fetch(`${baseUrl}/apis/app/acl/get.json`)
  ).json();
  fs.writeFileSync(
    path.resolve(__dirname, "generated", "kintone-api-schemas.json"),
    prettier.format(JSON.stringify(schemas), { parser: "json" })
  );
})();
