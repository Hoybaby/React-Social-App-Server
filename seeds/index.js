const mongoose = require("mongoose");
const faker = require("faker");
const Post = require("../models/Post");
const User = require("../models/User");

require("dotenv").config();

const createFakeUser = () => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
};

const createFakePost = (userId) => {
  return {
    body: faker.lorem.sentences(5),
    user: userId,
  };
};

(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete any existing data
    await User.deleteMany();
    await Post.deleteMany();

    // Seed users
    const users = new Array(15).fill(0).map(createFakeUser);
    const createdUsers = await User.insertMany(users);
    console.log(`Users seeded`);

    const userId = () => {
      return createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;
    };

    // Seed posts
    const posts = new Array(20).fill(0).map(() => createFakePost(userId()));
    const createdPosts = await Post.insertMany(posts);
    console.log("Posts seeded")

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
