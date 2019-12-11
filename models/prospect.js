require('./prospect-property');

module.exports = 
class Prospect {
  constructor(id, properties) {
    this.id = id;
    this.properties = properties || [];
  }
}