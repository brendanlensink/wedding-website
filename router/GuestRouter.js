import express from "express";
import DBService from "../service/DBService.js";
import AuthManager from "../manager/AuthManager.js";

const authManager = new AuthManager();
const guestRouter = express.Router();
const dbService = new DBService();

guestRouter.get("/", (req, res) => {
  const authToken = req.cookies.UserToken;
  const storedToken = authManager.userToken;

  if (authToken !== undefined && authToken === storedToken) {
    res.render("../pages/guest/home");
  } else {
    res.render("../pages/guest/login", { message: false });
  }
});

guestRouter.post("/guest/login", async (req, res) => {
  const { email } = req.body;

  const user = await dbService.getUserBy(email);
  if (user) {
    const token = authManager.storeUser(user);
    res.cookie("UserToken", token);
    res.redirect("/");
  } else {
    res.render("../pages/guest/login", {
      message: "Invalid email",
      messageClass: "alert-danger",
    });
  }
});

export default guestRouter;
