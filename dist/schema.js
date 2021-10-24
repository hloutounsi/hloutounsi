"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

const typeDefs = `
    type User {
        id: ID
        firstName: String
        lastName: String
        gender: Gender
        language: String
        age: Int
        email: String
        contacts: [Contact]
    }

    type Alien {
        id: ID
        firstName: String
        lastName: String
        planet: String
    }

    type Contact {
        firstName: String
        lastName: String
    }

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    type Email {
        email: User
    }

    type Query {
        getOneUser(id: ID): User
        getAliens: [Alien]
    }

    input UserInput {
        id: ID
        firstName: String
        lastName: String
        gender: Gender
        language: String
        age: Int
        email: String
        contacts: [ContactInput]
    }

    input ContactInput {
        firstName: String
        lastName: String
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(input: UserInput): User
        deleteUser(id: ID!): String
    }
`;
const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs,
  resolvers: _resolvers.resolvers
});
exports.schema = schema;