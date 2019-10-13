const uuid = require('uuid/v4')

module.exports = 
class Prospect {
  constructor(name, email) {
    this.id = uuid();
    this.name = name;
    this.email = email;
  }
}