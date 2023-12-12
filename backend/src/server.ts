import express, { Request, Response } from "express";
import { config } from "dotenv";
import path from "path";
import http from "http";
config({ path: path.resolve(__dirname, "../.env") });
import cors from "cors";
import "./config/database.config";
import api from "./routes";

const PORT = process.env.PORT || 5000;
const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors({ methods: ["GET", "POST", "PUT", "DELETE"] }))
  .use(`/api/${process.env.VERSION}`, api);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server link: http://localhost:${PORT}`);
});
