const mongoose = require("mongoose");
const faker = require("faker");
const Post = require("../models/Post");
const User = require("../models/User");

const createFakeUser = () => {
  return {
    username: faker.internet.userName,
    password: faker.internet.password,
    email: faker.internet.email,
  };
};

const createFakePost = (userID) => {
  return {
    username: faker.internet.userName,
    password: faker.internet.password,
    email: faker.internet.email,
  };
};

(async function () {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Delete any existing data
  await User.deleteMany();
  await Post.deleteMany();

  const users = new Array(15).fill(0).map(createFakeUser)
})();
