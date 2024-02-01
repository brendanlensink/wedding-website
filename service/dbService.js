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
      ssl: {
        rejectUnauthorized: false,
      },
    };

    this.pool = new pg.Pool(connection);
  }

  async getAllUsers() {
    const response = await this.pool.query("SELECT * FROM guest");
    return response.rows;
  }

  async getUserBy(email) {
    console.log(await this.getAllUsers());
    const response = await this.pool.query(
      "SELECT * FROM guest WHERE email = $1",
      [email]
    );
    return response.rows[0];
  }

  async updateUser(user) {
    const { rsvp, song, email } = user;
    await this.pool.query(
      "UPDATE guest SET rsvp = $1, song = $2, updated = $3 WHERE email = $4",
      [Number(rsvp), song, new Date(), email]
    );
  }

  async addUser(row) {
    await this.pool.query(
      "INSERT INTO guest (name, invites, email) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
      [row[0], row[1], row[2]]
    );
  }
}
