"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _express = _interopRequireDefault(require("express"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadRouter = _express.default.Router();

const storage = _multer.default.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  }

});

const upload = (0, _multer.default)({
  storage
});
uploadRouter.post('/', _utils.isAuth, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});
var _default = uploadRouter;
exports.default = _default;