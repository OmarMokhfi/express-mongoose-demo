const express = require("express");
const { PostModel } = require("../models/Post");
const { UserModel } = require("../models/User");
const { fetchPosts, addNewPostToUser } = require("../controllers/post");

const router = express.Router();

router.get("/", async (req, res) => {
  let allPosts = await fetchPosts();
  res.status(200).send(allPosts);
});

router.post("/:userId", async (req, res) => {
  let { userId } = req.params;
  addNewPostToUser(userId, "Post 1", "Description of post 1").then(
    (res) => {
      res.status(201).send(res);
    },
    (err) => {
      res.status(err.status).send({
        message: err.msg,
      });
    }
  );
});

module.exports = router;
