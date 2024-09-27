import express, { Request, Response } from "express";
import { speechToText } from "./functions/speechToText";
import cors from "cors";
import "dotenv/config";
import os from "os";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(express.json({ limit: "50mb" }));

// Cross-origin requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.post("/speech-to-text", (req: Request, res: Response) => {
  speechToText(req, res);
});

app.get("/", (req, res) => {
  res.send("The Speech-to-Text API is up and running!");
});

// Function to get the local network IP
// const getNetworkIP = () => {
//   const interfaces = os.networkInterfaces();
//   for (const iface of Object.values(interfaces)) {
//     for (const alias of iface || []) {
//       if (alias.family === "IPv4" && !alias.internal) {
//         return alias.address; // Return the first non-internal IPv4 address
//       }
//     }
//   }
//   return "127.0.0.1"; // Fallback to localhost if no network IP is found
// };

app.listen(port, "192.168.110.121", () => {
  console.log(`Server is running on http://192.168.110.121:${port}`);
});
