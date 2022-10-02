import express from "express";
import * as csv from "fast-csv";
import AdminManager from "../manager/AuthManager.js";
import DBService from "../service/DBService.js";

const adminRouter = express.Router();
const authManager = new AdminManager();
const dbService = new DBService();

async function renderAdmin(res) {
  const users = await dbService.getAllUsers();

  res.render("../pages/admin/dashboard", {
    guests: users,
  });
}

adminRouter.get("/", (req, res) => {
  const authToken = req.cookies.AuthToken;
  const storedToken = authManager.authToken;

  if (storedToken !== undefined && authToken === storedToken) {
    renderAdmin(res);
  } else {
    res.render("../pages/admin/login", { message: false });
  }
});

adminRouter.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.cookie("AuthToken", authManager.generateAuthToken());
    res.redirect("/admin/");
  } else {
    res.render("../pages/admin/login", {
      message: "Invalid password", // TODO: figure out why this doesnt work :|
      messageClass: "alert-danger",
    });
  }
});

adminRouter.post("/guests", (req, res) => {
  const { data } = req.body;

  csv
    .parseString(data)
    .on("error", (error) => console.error(error))
    .on("data", (row) => dbService.addUser(row));

  res.redirect("/admin/");
});

export default adminRouter;
