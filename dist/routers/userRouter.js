"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _data = _interopRequireDefault(require("../data.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = _express.default.Router();

userRouter.get('/top-sellers', (0, _expressAsyncHandler.default)(async (req, res) => {
  const topSellers = await _userModel.default.find({
    isSeller: true
  }).sort({
    'seller.rating': -1
  }).limit(3);
  res.send(topSellers);
}));
userRouter.get('/seed', (0, _expressAsyncHandler.default)(async (req, res) => {
  // await User.remove({});
  const createdUsers = await _userModel.default.insertMany(_data.default.users);
  res.send({
    createdUsers
  });
}));
userRouter.post('/signin', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findOne({
    email: req.body.email
  });

  if (user) {
    if (_bcryptjs.default.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: (0, _utils.generateToken)(user)
      });
      return;
    }
  }

  res.status(401).send({
    message: 'Invalid email or password'
  });
}));
userRouter.post('/register', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = new _userModel.default({
    name: req.body.name,
    email: req.body.email,
    password: _bcryptjs.default.hashSync(req.body.password, 8)
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    isSeller: user.isSeller,
    token: (0, _utils.generateToken)(createdUser)
  });
}));
userRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      message: 'User Not Found'
    });
  }
}));
userRouter.put('/profile', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description = req.body.sellerDescription || user.seller.description;
    }

    if (req.body.password) {
      user.password = _bcryptjs.default.hashSync(req.body.password, 8);
    }

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      token: (0, _utils.generateToken)(updatedUser)
    });
  }
}));
userRouter.get('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const users = await _userModel.default.find({});
  res.send(users);
}));
userRouter.delete('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);

  if (user) {
    if (user.email === 'admin@example.com') {
      res.status(400).send({
        message: 'Can Not Delete Admin User'
      });
      return;
    }

    const deleteUser = await user.remove();
    res.send({
      message: 'User Deleted',
      user: deleteUser
    });
  } else {
    res.status(404).send({
      message: 'User Not Found'
    });
  }
}));
userRouter.put('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = req.body.isSeller || user.isSeller;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.send({
      message: 'User Updated',
      user: updatedUser
    });
  } else {
    res.status(404).send({
      message: 'User Not Found'
    });
  }
}));
var _default = userRouter;
exports.default = _default;