const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  listName: {
    type: String,
    trim: true,
  },
});

userSchema.pre("save", (req, res, next) => {
  console.log(this, req.body);
});

//Export the model
module.exports = mongoose.model("User", userSchema);
