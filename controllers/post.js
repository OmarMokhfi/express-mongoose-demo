const { PostModel } = require("../models/Post");

const fetchPosts = async () => {
  return await PostModel.find();
};

const addNewPostToUser = (userId, title, description) => {
  return new Promise(async (resolve, reject) => {
    try {
        // fetching user by id
      let user = await UserModel.findById(userId);
      if (!user) {
        // user not found
        reject({
          status: 404,
          msg: "user not found",
        });
      } else {
        // user found
        // create new post with relation to user
        const post = new PostModel({
          title: title,
          description: description,
          author: user._id,
        });
        // saving post in database
        let savedUser = await post.save().then((saved) => {
          // creating relation to post in user
          // adding new post to user posts
          return UserModel.findByIdAndUpdate(
            user._id,
            {
              $push: { posts: saved._id },
            },
            { new: true }
          );
        });
        resolve(savedUser);
      }
    } catch (error) {
      reject({
        status: 500,
        msg: "A problem happend",
      });
    }
  });
};

module.exports = { fetchPosts, addNewPostToUser };
