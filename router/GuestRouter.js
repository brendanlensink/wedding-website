import express from "express";
import DBService from "../service/dbService.js";
import AuthManager from "../manager/AuthManager.js";

const authManager = new AuthManager();
const guestRouter = express.Router();
const dbService = new DBService();

guestRouter.use((req, res, next) => {
  const authToken = req.cookies.UserToken;
  const storedToken = authManager.userToken;
  console.log(`2 ${JSON.stringify(authManager.user)}`);
  if (req.method === "GET") {
    if (authToken === undefined || authToken !== storedToken) {
      console.log(authToken);
      const message = req.cookies.LoginError;
      res.render("../pages/guest/login", { message });
      return;
    }
  }

  next();
});

guestRouter.get("/", (req, res) => {
  res.render("../pages/guest/home", {
    user: authManager.user,
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
  res.render("../pages/guest/rsvp", {
    user: authManager.user,
  });
});

guestRouter.get("/rsvp-complete", (req, res) => {
  console.log(`3 ${JSON.stringify(authManager.user)}`);
  res.render("../pages/guest/rsvp-complete", {
    user: authManager.user,
  });
});

guestRouter.post("/guest/rsvp", async (req, res) => {
  const { rsvp, song, dietary } = req.body;

  if (rsvp === -1) {
    authManager.user.rsvp = -1;
    authManager.user.song = "";
    authManager.user.dietary = "";
  } else {
    authManager.user.rsvp = rsvp;
    authManager.user.song = song;
    authManager.user.dietary = dietary;
  }

  await dbService.updateUser(authManager.user);

  console.log(`1 ${authManager.user}`);

  res.redirect("/rsvp-complete");
});

guestRouter.get("/details", (req, res) => {
  res.render("../pages/guest/details", {
    user: authManager.user,
  });
});

guestRouter.get("/accomodations", (req, res) => {
  res.render("../pages/guest/accomodations", {
    user: authManager.user,
  });
});

guestRouter.get("/questions", (req, res) => {
  res.render("../pages/guest/questions", {
    user: authManager.user,
  });
});

guestRouter.get("/wedding-party", (req, res) => {
  res.render("../pages/guest/wedding-party", {
    user: authManager.user,
  });
});
export default guestRouter;
