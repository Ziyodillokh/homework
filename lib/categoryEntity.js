const { v4 } = require("uuid");

class CategoryEntity {
  constructor(name) {
    this.id = v4();
    this.name = name;
  }
}

module.exports = { CategoryEntity };
