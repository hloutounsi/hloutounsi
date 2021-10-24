import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers.js';

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

    type Product {
        id: ID
        name: String
        seller: User
        image: String
        category: Category
        description: String
        price: Float
        countInStock: Int
        rating: Int
        numReviews: Int
        reviews: [Review]
        weight: Float
        newPrice: Int
    }

    type Review {
        name: String
        comment: String
        rating: Int
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

    enum Category {
        TUNISIAN_SPECIALTY
        MOROCCAN_SPECIALTY
        OTHER
    }

    type Email {
        email: User
    }

    type Query {
        getOneUser(id: ID): User
        getAliens: [Alien]
        getProducts: [Product]
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

    input ReviewInput {
        name: String
        comment: String
        rating: Int
    }

    input SellerInput {
        rating: Int
        numReviews: Int
    }

    input ProductInput {
        name: String
        seller: SellerInput
        image: String
        category: Category
        description: String
        price: Float
        countInStock: Int
        rating: Int
        numReviews: Int
        reviews: [ReviewInput]
        weight: Float
        newPrice: Int
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(input: UserInput): User
        deleteUser(id: ID!): String
        createProduct(input: ProductInput): Product
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
