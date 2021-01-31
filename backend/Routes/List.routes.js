const router = require("express").Router();
const createError = require("http-errors");
const User = require("../models/user.model");
const List = require("../models/list.model");
const { userSchema, listSchema } = require("../helper/validation__schema");
const { genAccessToken, verifyAccessToken } = require("../helper/jwt_helper");

router.post("/register", async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const doesEmailExist = await User.findOne({
      email: result.email,
    });
    if (doesEmailExist)
      throw createError.Conflict("Email Address already exist");
    const doesMobileExist = await User.findOne({
      mobile: result.mobile,
    });
    console.log("yes = ", doesMobileExist);
    if (doesMobileExist) throw createError.Conflict("Mobile number exist");
    const user = await new User(result);
    console.log("user = ", user);
    const savedUser = await user.save();
    const token = await genAccessToken(savedUser._id);
    console.log("token = ", token);
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      throw createError.BadRequest("Email, Password both fields are required");
    const user = await User.findOne({ email: req.body.email });
    console.log("User = ", user);
    if (!user) throw createError.NotFound("User not Found");
    const isPasswordValid = await user.verifyPassword(req.body.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) throw createError.NotFound("User Not Found");
    const token = await genAccessToken(user._id);
    const sendUser = {
      fName: user.fName,
      email: user.email,
      mobile: user.mobile,
      lists: user.lists_to_add,
    };
    res.status(200).json({ token, user: sendUser });
  } catch (error) {
    console.log("errorrs = ", error);
    next(error);
  }
});

router.post("/addList", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req.payload;
    const result = await listSchema.validateAsync({
      list: req.body.list,
    });
    const newList = await new List(result);
    await newList.save();
    user.lists_to_add.push(newList._id);
    await user.save();
    res.status(200).send("list added");
  } catch (error) {
    next(error);
  }
});

router.get("/getAllList", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req.payload;
    const lists = await User.findById(user._id).populate({
      path: "lists_to_add",
    });

    console.log("lists  = ", lists);
    if (lists.lists_to_add.length === 0)
      res.status(200).send("nothing is added");
    res.status(200).send(lists);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteList", verifyAccessToken, async (req, res, next) => {
  try {
    const user = req.payload;
    console.log(req.body);
    const list = await List.findByIdAndDelete(req.body._id);
    console.log("List = ", list);
    if (!list) throw createError.NotFound();
    console.log("user = ", user);
    const index = user.lists_to_add.indexOf(req.body._id);
    console.log("index = ", index);
    console.log("list = ", list);
    await user.lists_to_add.splice(index, 1);
    await user.save();
    console.log("user = ", user);

    res.send("Successfully Deleted");
  } catch (error) {
    next(error);
  }
});

router.get("/getUserDetails", verifyAccessToken, async (req, res, next) => {
  try {
    res.status(200).send(req.payload);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
