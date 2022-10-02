import crypto from "crypto";

export default class AuthManager {
  constructor() {
    this.authToken = undefined;
    this.user = undefined;
    this.userToken = undefined;
  }

  generateAuthToken() {
    this.authToken = crypto.randomBytes(30).toString("hex");
    return this.authToken;
  }

  storeUser(user) {
    this.user = user;
    this.userToken = this.generateAuthToken();
    return this.userToken;
  }
}
