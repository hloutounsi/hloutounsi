"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _emailModel = _interopRequireDefault(require("../models/emailModel.js"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emailRouter = _express.default.Router();

emailRouter.get('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const emails = await _emailModel.default.find({});
  res.send(emails);
}));
emailRouter.post('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  console.log(req.body.email);
  const email = new _emailModel.default({
    email: req.body.email
  });
  const createdEmail = await email.save();
  res.status(201).send({
    message: 'Nouvel email créé',
    email: createdEmail
  });
}));
var _default = emailRouter;
exports.default = _default;