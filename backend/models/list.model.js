const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var listSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("List", listSchema);
