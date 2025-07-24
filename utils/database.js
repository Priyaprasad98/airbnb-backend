const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://priyaprasad:%40123Piku@airbnb-cluster.kltignf.mongodb.net/?retryWrites=true&w=majority&appName=airbnb-cluster";

let _db; //private variable

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL).then(client => {
    console.log(client);
    callback();
    _db = client.db('airbnb');
  }).catch((error) => {
    console.log("Error while connecting to Mongo:", error);
});
}

const getDB = () => {
  if(!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}
exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
