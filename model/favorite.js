//external module

//local module


module.exports = class Favorite {
 constructor(homeId) {
     this.homeId = homeId;   
  }

 save() {
   const db = getDB();  
   return db.collection('favorites')
   .findOne({homeId: this.homeId})
   .then(existingFav => {
    console.log(existingFav);
    if(!existingFav) {
      return db.collection('favorites').insertOne(this);
    }
    return Promise.resolve(); //.then in contoller will get undefined by deafault
   });
   
 }

 static removeFavorite(homeId) {
  const db = getDB();
  console.log('Deleting from DB where homeId =', homeId);
  return db.collection('favorites')
  .deleteOne({homeId: homeId});
 }

 static getFavorites() {
   const db = getDB();
   return db.collection("favorites").find().toArray();
}
} 