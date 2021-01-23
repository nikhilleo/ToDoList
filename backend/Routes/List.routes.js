const router = require("express").Router();
const createError = require("http-errors");
const List = require("../models/list.model");
const { listSchema } = require("../helper/validation__schema");

router.post("/addList", async (req, res, next) => {
  try {
    console.log("Body = ", req.body);
    const result = await listSchema.validateAsync(req.body);
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
      listUniqueNumber: req.body.listUniqueNumber,
    });
    console.log(list);
    if (!list) throw createError.NotFound();
    res.send("Successfully Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
