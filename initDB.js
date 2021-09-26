const mongoose = require('mongoose');
const { ApolloServer} = require('apollo-server');
const typeDefs = require('./graphql/typedDefs')
const resolvers = require('./graphql/resolvers');

const dotenv = require('dotenv').config

module.exports = () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    });
    

    mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
}