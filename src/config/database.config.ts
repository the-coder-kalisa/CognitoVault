import { connect, set } from "mongoose";
// set("strictQuery", false);
connect(process.env.DB_URL!)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));
