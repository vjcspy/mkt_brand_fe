import Axios from "axios";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  try {
    await runMiddleware(req, res, cors);
  } catch (e) {
    return;
  }
  const response = await Axios.post(
    `${process.env.GGG_INTERNAL}/${req.query.pathname}`,
    { ...req.body },
    {
      headers: {
        "tgs-version": "2.6.10",
      },
    }
  );
  res.json({ ...response.data });
}
export default handler;
