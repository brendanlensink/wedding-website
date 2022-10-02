import crypto from "crypto";

export default class AdminManager {
  constructor() {
    this.authToken = undefined;
  }

  generateAuthToken() {
    this.authToken = crypto.randomBytes(30).toString("hex");
    return this.authToken;
  }
}
