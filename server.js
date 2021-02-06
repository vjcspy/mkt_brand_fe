const express = require("express");
const next = require("next");
const vhost = require("vhost");

const port = process.env.PORT || 3041;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const mainServer = express();
  const gogiServer = express();
  // const kichiServer = express();

  gogiServer.get(/\/(_next\/data\/.+\/)/, (req, res) => {
    req.url = req.url.replace(/(_next\/data\/\w+\/)/, (s) => s + "gogi/");
    return handle(req, res);
  });

  gogiServer.get(/\/(images|_next|api|fonts)/, (req, res) => {
    return handle(req, res);
  });

  gogiServer.get("/", (req, res) => {
    req.url = "/gogi";
    return app.render(req, res, "/[site]", { site: "gogi" });
  });

  gogiServer.get("/*", (req, res) => {
    const path = req.path;
    req.url = "/gogi" + req.url;
    return app.render(req, res, `/[site]${path}`, { site: "gogi" });
  });

  gogiServer.all("*", (req, res) => {
    return handle(req, res);
  });

  // kichiServer.get("/", (req, res) => {
  //   return app.render(req, res, "/kichi", req.query);
  // });

  // kichiServer.get("/*", (req, res) => {
  //   return app.render(req, res, `/kichi${req.path}`, req.query);
  // });

  // kichiServer.all("*", (req, res) => {
  //   return handle(req, res);
  // });

  // mainServer.use(vhost("ggg-web.hexagonasia.co", gogiServer));
  mainServer.use(vhost("lvh.me", gogiServer));
  // mainServer.use(vhost("kichi.hexagonasia.co", kichiServer));
  mainServer.listen(port, (err) => {
    if (err) throw err;

    console.log(`> Ready on http://lvh.me:${port}`);
  });
});
