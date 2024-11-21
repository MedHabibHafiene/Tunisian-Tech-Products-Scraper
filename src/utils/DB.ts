import mongoose from "mongoose";
import config from "../config";

const connect = async (url: string) => {
  try {
    await mongoose.connect(`${url}`, { dbName: `${config.mongoName}` });
    console.log("MongoDB Connected ...");
  } catch (err) {
    console.log("problem mongo connection");
    process.exit(1);
  }
};

export default connect;
