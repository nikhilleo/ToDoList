const router = require("express").Router();
const createError = require("http-errors");
const List = require("../models/list.model");
const { userSchema } = require("../helper/validation__schema");

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await userSchema.validateAsync(req.body);
    const doesEmailExist = await List.findOne({
      email: result.email,
    });
    if (doesEmailExist)
      throw createError.Conflict("Email Address already exist");
    const doesMobileExist = await List.findOne({
      mobile: result.mobile,
    });
    console.log("yes = ", doesMobileExist);
    if (doesMobileExist) throw createError.Conflict("Mobile mber exist");
    const user = await new List(result);
    await user.save();
    console.log("user = ", user);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {});

router.post("/addList", async (req, res, next) => {
  try {
    console.log("Body = ", req.body);
    const result = await userSchema.validateAsync(req.body);
    console.log("result = ", result);
    const list = await new List(result);
    console.log("new list = ", list);
    await list.save();
    res.status(200).send("List Saved Successfullly");
  } catch (error) {
    console.log("err = ", error);
    next(error);
  }
});

router.get("/getAllList", async (req, res, next) => {
  try {
    const lists = await List.find();
    console.log(lists);
    res.status(200).send(lists);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteList", async (req, res, next) => {
  try {
    const list = await List.findOneAndDelete({
      _id: req.body.id,
    });
    console.log(list);
    if (!list) throw createError.NotFound();
    res.send("Successfully Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
