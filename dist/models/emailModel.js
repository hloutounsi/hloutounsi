"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emailSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Email = _mongoose.default.model('Email', emailSchema);

var _default = Email;
exports.default = _default;