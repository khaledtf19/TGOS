import express from "express";
import dbConnection from "./startup/db.mjs";
import dotenv from "dotenv";
import routes from "./startup/routes.mjs";
import cors from "cors";
import prod from "./startup/prod.mjs";
import error from "./middleware/error.js";

const port = process.env.PORT || 8080;
const app = express();
dotenv.config();
app.use(cors());

routes(app);
prod(app);
dbConnection();
app.use(error);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
