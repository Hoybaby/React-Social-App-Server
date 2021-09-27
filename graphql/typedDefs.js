const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        user: User!
        comments: [Comment]!
        likes: [Like]!
        createdAt: String!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        user: User!
        body: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        user: User!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
    }

    type Auth {
        user: User!
        token: String!
    }
    # this is an input which is a difffernt kind of type which is given to the resolver
    input RegisterInput{
        username: String!
        password: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    # in order to make users log in need to make a mutation
    type Mutation {
        # this is handlded in the users.js part
        register(registerInput: RegisterInput): Auth!
        login(username: String!, password: String!) : Auth!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        # taking the post ID checks if the post is still up which is kinda nice
        deleteComment(postId: ID!, commentId: ID!): Post!
        # this like post will be a toggle eventually
        likePost(postId: ID!): Post!

    }
    
`