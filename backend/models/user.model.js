const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const List = require("./list.model");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
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
    lists_to_add: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = await hashedPassword;
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    console.log("Password = ", password, "This pasword = ", this.password);
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

//Export the model
module.exports = mongoose.model("User", userSchema);
