"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Products = exports.Aliens = exports.Users = void 0;

var _casual = _interopRequireDefault(require("casual"));

var _lodash = _interopRequireDefault(require("lodash"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mongo connection
_mongoose.default.Promise = global.Promise;

_mongoose.default.connect('mongodb+srv://Mohamed:0789mB!!@cluster0.qz9g8.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new _mongoose.default.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  language: {
    type: String
  },
  email: {
    type: String
  },
  contacts: {
    type: Array
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isSeller: {
    type: Boolean,
    default: false,
    required: true
  },
  seller: {
    name: String,
    logo: String,
    logo2: String,
    description: String,
    rating: {
      type: Number,
      default: 0,
      required: true
    },
    numReviews: {
      type: Number,
      default: 0,
      required: true
    }
  }
});
const reviewSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
const sellerSchema = new _mongoose.default.Schema({
  rating: {
    type: Number
  },
  numReviews: {
    type: Number
  }
}, {
  timestamps: true
});
const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  seller: sellerSchema,
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  numReviews: {
    type: Number,
    required: true
  },
  reviews: [reviewSchema],
  weight: {
    type: Number,
    required: true
  },
  newPrice: {
    type: Number
  }
}, {
  timestamps: true
});

const Products = _mongoose.default.model('products', productSchema);

exports.Products = Products;

const Users = _mongoose.default.model('users', userSchema); // SQL


exports.Users = Users;
const sequelize = new _sequelize.default('database', null, null, {
  dialect: 'sqlite',
  storage: './alien.sqlite'
});
const Aliens = sequelize.define('aliens', {
  firstName: {
    type: _sequelize.default.STRING
  },
  lastName: {
    type: _sequelize.default.STRING
  },
  planet: {
    type: _sequelize.default.STRING
  }
});
exports.Aliens = Aliens;
Aliens.sync({
  force: true
}).then(() => {
  _lodash.default.times(10, i => {
    Aliens.create({
      firstName: _casual.default.first_name,
      lastName: _casual.default.last_name,
      planet: _casual.default.word
    });
  });
});