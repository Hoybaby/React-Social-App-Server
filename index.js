const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typedDefs')
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const dotenv = require('dotenv').config

console.log()

// const pubsub = new PubSub();

// require('./initDB')();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});



mongoose
    .connect('mongodb+srv://hoybaby:Welcome0@firstcluster.b4kva.mongodb.net/Mern?retryWrites=true&w=major', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
})