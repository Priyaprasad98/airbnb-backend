//local model
const {getDB} = require("../utils/database");
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
    const db = getDB();
    return db.collection("homes").insertOne(this).then((result)=>{
      console.log(result);
    }); 
  }
  
  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray(); //this promise returns cursor that we need to convert in array 
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id = ?', [homeId]);
  }

  static removeHome(id) {
    return db.execute('DELETE FROM homes WHERE id = ?', [id]);
  } 
} 