const express = require("express");
const { UserModel } = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUsers = await UserModel.find({ isActive: false }).populate("posts");
  res.status(200).send(allUsers);
});

router.post("/", async (req, res) => {
  // creating user model instance
  const user = new UserModel({
    name: "Omar",
    email: "omar@gmail.com",
    password: "cla1234",
  });
  // creating user in database
  let savedUser = await user.save();
  res.status(201).send(savedUser);
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let properties = req.body;
    let updatedUser = await UserModel.findByIdAndUpdate(id, properties);
    res.status(202).send(updatedUser);
  } catch (error) {
    res.status(500).send({
      message: "Update failed",
    });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(202).send({
      message: "User was deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occured",
    });
  }
});

module.exports = router;
