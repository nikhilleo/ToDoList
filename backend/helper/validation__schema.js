const joi = require("@hapi/joi");

const userSchema = joi.object({
  fName: joi.string().required().trim(),
  email: joi.string().email().lowercase().required().trim(),
  password: joi.string().min(7).required(),
  mobile: joi.string().required().min(10).max(10).trim(),
  listName: joi.string().trim(),
});

const listSchema = joi.object({
  email: joi.string().email().lowercase().required().trim(),
  list: joi.string().required().trim(),
});

module.exports = { userSchema, listSchema };
