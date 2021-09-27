const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

const {
  UserInputError,
  ApolloError,
  AuthenticationError,
} = require("apollo-server");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      // going to input my secret key below which i deconstructed from the config file. it is going into config file to hide sensitive information from github
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    // dont need to descontructure because we have in the typeDefs already
    async login(_, { username, password }) {
      // const {errors, valid} = validateLoginInput(username, password)

      // if(!valid) {
      //     throw new UserInputError('Not Valid', {errors});
      // }
      const user = await User.findOne({ username });

      if (!user) {
        throw new ApolloError("User not Found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new AuthenticationError("Wrong credentials");
      }

      const token = generateToken(user);

      delete user.password;

      return {
        user,
        token,
      };
    },
    // inside of the register function, needs to take some input
    // parents give us resaults from the input from last step, in some cases, you can have mutiple resolvers
    // register(parent, args,context, info)
    async register(_, { registerInput: { username, email, password } }) {
      // What i need to do: Validate user data,
      // const {valid, errors} = validateRegisterInput( username, email, password, confirmPassword)
      // if(!valid) {
      //     // I am passing in the payload of those errors I created in the validators.js
      //     throw new UserInputError('Errors', {errors})
      // }

      // make sure users doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken");
      }

      // hash password before storing it in the database and create an auth token
      // the args
      // ------------
      // need to hash the password which is synchronous
      password = await bcrypt.hash(password, 12);

      // user object
      const newUser = new User({
        email,
        username,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        user: res,
        token,
      };
    },
  },
};
