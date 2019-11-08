import fetch from 'node-fetch';

const subdomain = process.env.KINTONE_SUBDOMAIN;
const username = process.env.KINTONE_USERNAME;
const password = process.env.KINTONE_PASSWORD;

type Apis = {
  [api: string]: {
    link: string
  }
};

type Api = {
  id: string;
  baseUrl: string;
  path: string;
  httpMethod: string;
  schemas: object;
}


(async () => {
  const baseUrl = `https://${subdomain}.cybozu.com/k/v1`;

  const resp = await fetch(`${baseUrl}/apis.json`);
  const apis: Apis = (await resp.json()).apis;

  console.log(apis);
  Object.entries(apis).forEach(async ([key, value]) => {
    const resp = await fetch(`${baseUrl}/${value.link}`);
    const json: Api = await resp.json();
    console.log(json.id);
  })
})();
