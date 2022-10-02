import express from "express";
import * as csv from "fast-csv";
import AdminManager from "../manager/AdminManager.js";
import DBService from "../service/DBService.js";

const adminRouter = express.Router();
const adminManager = new AdminManager();
const dbService = new DBService();

adminRouter.get("/", (req, res) => {
  const authToken = req.cookies.AuthToken;
  const storedToken = adminManager.authToken;

  // if (authToken === storedToken) {
  renderAdmin(res);
  // } else {
  // res.render("../pages/admin/login", { message: false });
  // }
});

function renderAdmin(res) {
  dbService.pool.query("SELECT * FROM guest", (error, result) => {
    if (error) {
      throw error;
    }
    // TODO: Handle error
    res.render("../pages/admin/dashboard", {
      guests: result.rows,
    });
  });
}

adminRouter.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.cookie("AuthToken", adminManager.generateAuthToken());
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
    .on("data", (row) => {
      dbService.pool.query(
        "INSERT INTO guest (name, invites, email) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [row[0], row[1], row[2]],
        (error, _) => {
          if (error) {
            console.log(error);
          }
          console.log("added");
        }
      );
    })
    .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));

  res.redirect("/admin/");
});

export default adminRouter;
