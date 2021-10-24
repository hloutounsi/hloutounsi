"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
}, {
  timestamps: true
});

const User = _mongoose.default.model('User', userSchema);

var _default = User;
exports.default = _default;