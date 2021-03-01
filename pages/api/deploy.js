import Cors from "cors";
// import { spawn } from "child_process";
import exportSite from "../../exportSite";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        console.log("error");
        return reject(result);
      }
      console.log("resolve");

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  console.log("deploying ");
  // await exportSite.exportSite(req.query.site_code);
  // res.json({ success: "build error " });
  const sp = spawn(`sh`, ["deploy.sh"], { env: { ...process.env, SITE_CODE: req.query.site_code }, cwd: process.cwd() });
  sp.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
    // Rest of the API logic
  });

  sp.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  sp.on("error", (e) => {
    console.log(`error: ${e.message}`);
  });

  sp.on("close", (e) => {
    if (e) {
      res.json({ message: "build error", error_code: e });
    } else {
      res.json({
        message: "build succeed",
      });
    }
  });
}
export default handler;
