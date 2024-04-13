import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { createServer } from "http";
import "./mqtt";

config();

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

const server = createServer(app);


server.listen(parseInt(`${PORT}`), () => {
  console.log(`Server is running on port ${PORT}`);
});