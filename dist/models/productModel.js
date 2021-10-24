"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  seller: {
    type: _mongoose.default.Schema.Types.ObjectID,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: Number,
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

const Product = _mongoose.default.model('Product', productSchema);

var _default = Product;
exports.default = _default;