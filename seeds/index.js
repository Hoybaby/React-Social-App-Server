const mongoose = require("mongoose");
const faker = require("faker");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
const User = require("../models/User");

require("dotenv").config();

const createFakeUser = () => {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  console.log({ username, password });
  return {
    username,
    password: bcrypt.hashSync(password, 12),
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
    await Post.insertMany(posts);
    console.log("Posts seeded");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
