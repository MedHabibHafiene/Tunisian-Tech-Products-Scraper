import express from "express";
import connect from "./utils/DB";
import config from "./config";
import routes from "./routes";
import cors from "cors";

const server = express();
server.use(cors());
connect(config.mongoURL!);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(config.apiPrefix || "", routes);

server.listen(config.PORT, () => {
  console.log(`server run on ${config.PORT}`);
});
