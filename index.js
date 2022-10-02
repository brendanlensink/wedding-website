import express from "express";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import adminRouter from "./router/AdminRouter.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
