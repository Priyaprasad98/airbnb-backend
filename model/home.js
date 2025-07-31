const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  }
});

/*
//pre hook
homeSchema.pre("findOneAndDelete", async function(next) { 
  // findByIdAndDelete() is called on model, Mongoose triggers pre('findByIdAndDelete') hook, and inside that hook: this.getQuery() gives the query object — including the homeId we're trying to delete. 

  console.log(this.getQuery());
  const homeId = this.getQuery()._id;
  // deleteMany => delete all favorites if somehow multiple exist
  const result = await Favorite.deleteMany({homeId: homeId});
  console.log("🔥 Pre-hook fired. Favorite deleted:", result);
  next();
 
});
*/
module.exports = mongoose.model('Home', homeSchema);

