import express from "express";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminRouter from "./router/AdminRouter.js";
import guestRouter from "./router/GuestRouter.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

if (process.env.SAVE_THE_DATE_ACTIVE === "true") {
  app.get("/", (req, res) => {
    res.render("../pages/misc/savethedate");
  });
} else {
  app.use("/", guestRouter);
  app.use("/admin", adminRouter);
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}!`);
});
