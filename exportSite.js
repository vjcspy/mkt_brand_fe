const Axios = require("axios");
const fs = require("fs");
const cp = require("child_process");
require("dotenv-flow").config();

exports.exportSite = void 0;

async function fetchSite(site_code) {
  const data = (() => {
    let d = [];
    try {
      d = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    } catch (e) {
      console.log(e);
    }
    return d;
  })();

  const host = process.env.API_HOST;
  let {
    data: { jwt },
  } = await Axios.post(`${host}/auth/local`, {
    identifier: process.env.NEXTJS_USERNAME,
    password: process.env.NEXTJS_PASSWORD,
  });

  const { data: siteData } = await Axios.get(`${host}/sites/config/${site_code}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const index = data.findIndex((s) => s.site_code === site_code);
  if (index != -1) {
    data[index] = siteData;
  } else {
    data.push(siteData);
  }
  fs.writeFileSync("data.json", JSON.stringify(data));
}

async function exportSite(site_code) {
  const brand = site_code || process.env.SITE_CODE || "gogi";
  await fetchSite(brand);
  const buildResult = cp.spawnSync("yarn", ["build:dev"], { env: { ...process.env, SITE_CODE: brand } });
  if (buildResult.stdout) {
    console.log("Build Succeed");
  }
  if (buildResult.error) {
    console.log(buildResult.error);
  }

  const exportResult = cp.spawnSync("yarn", ["export:dev", "-o", `build/${brand}`], { env: { ...process.env, SITE_CODE: brand } });
  if (exportResult.stdout) {
    console.log("Export Succeed");
  }
  if (exportResult.error) {
    console.log(exportResult.error);
  }
}

// exportSite();
exports.exportSite = exportSite;
