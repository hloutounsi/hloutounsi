"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSellerOrAdmin = exports.isSeller = exports.isAdmin = exports.isAuth = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isSeller: user.isSeller
  }, process.env.JWT_SECRET || 'somethingsecret', {
    expiresIn: '30d'
  });
};

exports.generateToken = generateToken;

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
      if (err) {
        res.status(401).send({
          message: 'Invalid Token'
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: 'No Token'
    });
  }
};

exports.isAuth = isAuth;

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({
      message: 'Invalid Admin Token'
    });
  }
};

exports.isAdmin = isAdmin;

const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({
      message: 'Invalid Seller Token'
    });
  }
};

exports.isSeller = isSeller;

const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({
      message: 'Invalid Admin/Seller Token'
    });
  }
};

exports.isSellerOrAdmin = isSellerOrAdmin;