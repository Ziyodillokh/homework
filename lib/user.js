const { v4 } = require("uuid");

class User {
  constructor(name) {
    this.id = v4();
    this.name = name;
  }
}
module.exports = { User };
