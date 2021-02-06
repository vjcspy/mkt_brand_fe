const Axios = require("axios");
const fs = require("fs");
require("dotenv-flow").config();

async function fetchSites() {
  const host = process.env.API_HOST;
  let {
    data: { jwt },
  } = await Axios.post(`${host}/auth/local`, {
    identifier: process.env.NEXTJS_USERNAME,
    password: process.env.NEXTJS_PASSWORD,
  });

  const { data } = await Axios.get(`${host}/sites`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  await fs.writeFileSync("data.json", JSON.stringify(data));
}

fetchSites();
