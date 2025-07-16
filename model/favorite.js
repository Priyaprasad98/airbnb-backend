//Core Model
const path = require('path');
const fs = require('fs');

//Local Model
const rootDir = require('../utils/pathUtils');

const favoriteDataPath = path.join(rootDir,"data","favorite.json")
module.exports = class Favorite {

 static addToFavorite(id, callback) {
  Favorite.getFavorites((favorites) => {
    if(favorites.includes(id)) {
      callback("Home is already in Favorites");
    }
    else {
      favorites.push(id);
      fs.writeFile(favoriteDataPath,
        JSON.stringify(favorites), 
        (err) => {
        callback(err); 
      });
        console.log("came to add to favorite:",favorites);
    }
  });
 }

 static removeFavorite(id,callback) {
   Favorite.getFavorites((favorites) => {
    const filteredFavorites = favorites.filter(favId => favId !== id);
    fs.writeFile(favoriteDataPath,
        JSON.stringify(filteredFavorites), 
        (err) => {
          callback(err);
        });
   });
 }

 static getFavorites(callback) {
  fs.readFile(favoriteDataPath , (err,data) => {
    callback(!err ? JSON.parse(data) : []);
  });
 }

}
 