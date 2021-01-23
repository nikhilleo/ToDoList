const joi = require("@hapi/joi");

const listSchema = joi.object({
  listName: joi.string().required(),
});

module.exports = { listSchema };
