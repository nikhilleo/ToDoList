const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var listSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  list: {
    type: Array,
    trim: true,
  },
});

//Export the model
module.exports = mongoose.model("List", listSchema);
