import express from "express";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import adminRouter from "./router/AdminRouter.js";
import guestRouter from "./router/GuestRouter.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", guestRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
