import crypto from "crypto";

export default class AuthManager {
  constructor() {
    this.authedUsers = [];
  }

  static generateAuthToken() {
    return crypto.randomBytes(30).toString("hex");
  }

  storeUser(user) {
    const newUser = user;
    newUser.token = AuthManager.generateAuthToken();
    this.authedUsers.push(newUser);
    return newUser.token;
  }

  getUserBy(token) {
    return this.authedUsers.find((user) => user.token === token);
  }
}
