const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const user = require("./routers/user");
const post = require("./routers/post");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
// using middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const PORT = 3000;

// using routers
app.use("/api/user", user);
app.use("/api/post", post);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log("Database connection failed, trying again");
    await connectToDatabase();
  }
};

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log("Server is running");
});
