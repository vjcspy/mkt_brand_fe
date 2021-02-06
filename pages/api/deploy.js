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
  await exportSite.exportSite(req.query.site_code);
  res.json({ message: "success" });
  // res.json({ success: "build error " });
  // const sp = spawn(`sh`, ["deploy.sh"], { cwd: process.cwd() });
  // sp.stdout.on("data", (data) => {
  //   console.log(`stdout: ${data}`);
  //   // Rest of the API logic
  // });

  // sp.stderr.on("data", (data) => {
  //   console.log(`stderr: ${data}`);
  // });

  // sp.on("error", (e) => {
  //   console.log(`error: ${e.message}`);
  //   res.json({ message: "build error" });
  // });

  // sp.on("close", (e) => {
  //   res.json({
  //     message: "build succeed",
  //   });
  // });
}
export default handler;
