"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _dbConnectors = require("./dbConnectors.js");

// resolver map
const resolvers = {
  Query: {
    getOneUser: (root, {
      id
    }) => {
      return new Promise((resolve, object) => {
        _dbConnectors.Users.findById(id, (err, user) => {
          if (err) reject(err);else resolve(user);
        });
      });
    },
    getAliens: () => {
      return _dbConnectors.Aliens.findAll();
    },
    getProducts: () => {
      return _dbConnectors.Products.find();
    }
  },
  Mutation: {
    createProduct: (root, {
      input
    }) => {
      const newProduct = new _dbConnectors.Products({
        name: input.name,
        seller: input.seller,
        image: input.image,
        category: input.category,
        description: input.description,
        price: input.price,
        countInStock: input.countInStock,
        rating: input.rating,
        numReviews: input.numReviews,
        reviews: input.reviews,
        weight: input.weight,
        newPrice: input.newPrice
      });
      newProduct.id = newProduct._id;
      return new Promise((resolve, object) => {
        newProduct.save(err => {
          if (err) reject(err);else resolve(newProduct);
        });
      });
    },
    createUser: (root, {
      input
    }) => {
      const newUser = new _dbConnectors.Users({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        language: input.language,
        age: input.age,
        email: input.email,
        contacts: input.contacts
      });
      newUser.id = newUser._id;
      return new Promise((resolve, object) => {
        newUser.save(err => {
          if (err) reject(err);else resolve(newUser);
        });
      });
    },
    updateUser: (root, {
      input
    }) => {
      return new Promise((resolve, object) => {
        _dbConnectors.Users.findOneAndUpdate({
          _id: input.id
        }, input, {
          new: true
        }, (err, user) => {
          if (err) reject(err);else resolve(user);
        });
      });
    },
    deleteUser: (root, {
      id
    }) => {
      return new Promise((resolve, object) => {
        _dbConnectors.Users.remove({
          _id: id
        }, err => {
          if (err) reject(err);else resolve("Successfully deleted user");
        });
      });
    }
  }
};
exports.resolvers = resolvers;