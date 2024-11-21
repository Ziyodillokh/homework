const { v4 } = require("uuid");

class Fruit {
  constructor(name, price, count) {
    this.id = v4();
    this.name = name;
    this.price = price;
    this.count = count;
  }
}

module.exports = { Fruit };
