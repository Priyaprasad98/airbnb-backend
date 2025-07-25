//local model


module.exports = class Home {

  constructor(houseName, price, location, rating, img, description, _id) {
     this.houseName = houseName;
     this.price = price;
     this.location = location;
     this.rating = rating;
     this.img = img;
     this.description = description;
     if(_id) {
      this._id = _id; //if new home will be added it will be undefined and if edit home will be done that it will have id
     }
      
  }
  
  save() {
    const db = getDB();
    if(this._id) { //update case
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        img: this.img,
        description: this.description
      }
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields}
        );
    } else { //insert case
       return db.collection("homes").insertOne(this).then((result)=>{
       console.log(result);
      });
    }  
  }
  
  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray(); //this promise returns cursor that we need to convert in array 
  }

  static findById(homeId) {
    console.log(homeId);
   const db = getDB();
    return db.collection("homes")
    .find({_id: new ObjectId(String(homeId))})
    .next();
  }

  static removeHome(homeId) {
    const db = getDB();
    return db.collection("homes")
    .deleteOne({_id: new ObjectId(String(homeId))});
  }

} 