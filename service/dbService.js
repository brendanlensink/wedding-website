import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export default class DBService {
  constructor() {
    const connection = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };

    console.log(connection);

    this.pool = new pg.Pool(connection);
  }
}
