import pg from "pg";

const connection = {
  host: "",
  port: 1,
  database: "",
  user: "",
  password: "",
};

const db = pg(connection);

export default db;
