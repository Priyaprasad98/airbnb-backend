//local module
const db = require("../utils/database");
module.exports = class Home {

  constructor(houseName, price, location, rating, img, description, id) {
     this.houseName = houseName;
     this.price = price;
     this.location = location;
     this.rating = rating;
     this.img = img;
     this.description = description;
     this.id = id; //if new home will be added it will be undefined and if edit home will be done that it will have id
  }
  
  save() {
    if(this.id) { //update
      return db.execute('UPDATE homes SET houseName=?, price=?, location=?, rating=?, img=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.img, this.description, this.id]);
    }
    else { //add
      return db.execute('INSERT INTO homes (houseName, price, location, rating, img, description) VALUES(?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.img, this.description]);
    } 
  }
  
  static fetchAll() {
    return db.execute('SELECT * FROM homes');
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id = ?', [homeId]);
  }

  static removeHome(id,callback) {

  } 
} 