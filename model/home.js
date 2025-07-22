//Core Model
const path = require('path');
const fs = require('fs');

//Local Model
const rootDir = require('../utils/pathUtils');

const registeredHomes = [];
const HomeDataPath = path.join(rootDir,'data','homes.json');

module.exports = class Home {

   constructor(houseName, price, location, rating, img) {
     this.houseName = houseName;
     this.price = price;
     this.location = location;
     this.rating = rating;
     this.img = img;

   }
  
   save() {
     Home.fetchAll((registeredHomes) => {
       if(this.id) { //edit home case
         registeredHomes = registeredHomes.map(home => {
           if(home.id== this.id) {
             return this;
            }
           return home;
          })
       }
       else {  //add home case
         this.id = Math.random().toString();
         registeredHomes.push(this);
       }
       const filePath = path.join(rootDir,'data','homes.json');
       fs.writeFile(HomeDataPath, JSON.stringify(registeredHomes), err => {
       console.log(err);
       });
     });
    
   }
  
   static fetchAll(callback) {
     fs.readFile(HomeDataPath,(err,data) => {
       //console.log("file read:", err, data);
       callback(!err ? JSON.parse(data) : []); 
     });
    }

   static findById(homeId,callback) {
     this.fetchAll(homes => {
      const homeFound = homes.find(home =>  home.id === homeId );
      callback(homeFound);
     })
   }

   static removeHome(id,callback) {
     Home.fetchAll((homes) => {
      const filteredHomes = homes.filter(home => home.id !== id);
        fs.writeFile(HomeDataPath,
         JSON.stringify(filteredHomes), 
         (err) => {
           callback(err);
         });
    });
   }

} 