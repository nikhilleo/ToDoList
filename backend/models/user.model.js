const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
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
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

//Export the model
module.exports = mongoose.model("User", userSchema);
