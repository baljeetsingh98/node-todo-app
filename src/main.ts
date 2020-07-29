import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const HOST = process.env.APP_HOST || "http://localhost";
const PORT = Number(process.env.APP_PORT) || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started at ${HOST}:${PORT}`);
});
