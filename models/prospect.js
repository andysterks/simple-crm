const uuid = require('uuid/v4')
require('./prospect-property');

module.exports = 
class Prospect {
  constructor(id, name, email, properties) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.properties = properties || [];
  }
}