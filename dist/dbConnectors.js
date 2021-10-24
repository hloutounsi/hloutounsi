"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Aliens = exports.Users = void 0;

var _casual = _interopRequireDefault(require("casual"));

var _lodash = _interopRequireDefault(require("lodash"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  }
});

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