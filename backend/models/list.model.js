const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var listSchema = new mongoose.Schema({
  list: {
    type: String,
    trim: true,
  },
});

//Export the model
listSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("List", listSchema);
