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
    const savedUser = await user.save();
    const token = await genAccessToken(savedUser._id);
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
    console.log(user);
    if (!user) throw createError.NotFound("User not Found");
    const isPasswordValid = await user.verifyPassword(req.body.password);
    if (!isPasswordValid) throw createError.NotFound("User Not Found");
    const token = await genAccessToken(user._id);
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
});

router.post("/addList", verifyAccessToken, async (req, res, next) => {
  try {
    console.log(req.payload);
    const user = req.payload;
    const result = await listSchema.validateAsync({
      email: req.payload.email,
      list: req.body.list,
    });

    const isList = await List.findOne({ email: result.email });
    if (!isList) {
      const newList = await new List(result);
      await newList.save();
      console.log("NewList = ", newList);
      user.lists_to_add.push(newList._id);
      await user.save();
      console.log("user = ", user);
      res.status(200).send("List Added");
    } else {
      console.log("isList", isList);
      await isList.list.push(result.list);
      await isList.save();
      console.log("NewList = ", isList);
      console.log("User = ", user);
      user.lists_to_add.push(isList._id);
      await user.save();
      console.log("user = ", user);
      res.status(200).send("List Added");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/getAllList", verifyAccessToken, async (req, res, next) => {
  try {
    console.log(req.payload);
    const lists = await List.findOne({
      email: req.payload.email,
    });
    if (!lists) res.status(200).send("nothing is added");
    console.log(lists);
    res.status(200).send(lists);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteList", verifyAccessToken, async (req, res, next) => {
  try {
    console.log("User = ", req.payload);
    const list = List.findOne({ email: req.payload.email });
    if (!list) throw createError.NotFound();

    res.send("Successfully Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
