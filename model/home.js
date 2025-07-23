//local module
const db = require("../utils/database");
module.exports = class Home {

  constructor(houseName, price, location, rating, img, description) {
     this.houseName = houseName;
     this.price = price;
     this.location = location;
     this.rating = rating;
     this.img = img;
     this.description = description;
     this.id = this.id; //if new home will be added it will be undefined and if edit home will be done that it will have id
  }
  
  save() {
  }
  
  static fetchAll() {
    return db.execute('SELECT * FROM homes');
  }

  static findById(homeId) {
    return db.execute(`SELECT * FROM homes WHERE id = ${homeId}`);
  }

  static removeHome(id,callback) {

  } 
} 