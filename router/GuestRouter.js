import express from "express";
import DBService from "../service/dbService.js";
import AuthManager from "../manager/AuthManager.js";

const authManager = new AuthManager();
const guestRouter = express.Router();
const dbService = new DBService();

guestRouter.use((req, res, next) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);

  if (req.method === "GET") {
    if (user === undefined || user.token !== authToken) {
      const message = req.cookies.LoginError;
      res.render("../pages/guest/login", { message });
      return;
    }
  }

  next();
});

guestRouter.get("/", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);

  res.render("../pages/guest/home", {
    user,
  });
});

guestRouter.post("/guest/login", async (req, res) => {
  let { email } = req.body;
  email = email.toLowerCase();

  const user = await dbService.getUserBy(email);
  if (user) {
    const token = authManager.storeUser(user);
    res.cookie("UserToken", token);
    res.cookie("LoginError", "");
  } else {
    res.cookie("LoginError", "Incorrect email");
  }

  res.redirect("/");
});

guestRouter.get("/rsvp", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);
  res.render("../pages/guest/rsvp", {
    user,
  });
});

guestRouter.get("/rsvp-complete", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);

  res.render("../pages/guest/rsvp-complete", {
    user,
  });
});

guestRouter.post("/guest/rsvp", async (req, res) => {
  const { rsvp, song, dietary } = req.body;

  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);

  if (rsvp === -1) {
    user.rsvp = -1;
    user.song = "";
    user.dietary = "";
  } else {
    user.rsvp = rsvp;
    user.song = song;
    user.dietary = dietary;
  }

  await dbService.updateUser(user);

  res.redirect("/rsvp-complete");
});

guestRouter.get("/details", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);
  res.render("../pages/guest/details", {
    user,
  });
});

guestRouter.get("/accomodations", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);
  res.render("../pages/guest/accomodations", {
    user,
  });
});

guestRouter.get("/questions", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);
  res.render("../pages/guest/questions", {
    user,
  });
});

guestRouter.get("/wedding-party", (req, res) => {
  const authToken = req.cookies.UserToken;
  const user = authManager.getUserBy(authToken);
  res.render("../pages/guest/wedding-party", {
    user,
  });
});
export default guestRouter;
