const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest"
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Home"
  }
});

module.exports = mongoose.model('User', userSchema);

