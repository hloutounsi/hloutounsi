"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _data = _interopRequireDefault(require("../data.js"));

var _productModel = _interopRequireDefault(require("../models/productModel.js"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = _express.default.Router();

productRouter.get('/dashboard', (0, _expressAsyncHandler.default)(async (req, res) => {
  const products = await _productModel.default.find();
  res.send(products);
}));
productRouter.get('/', (0, _expressAsyncHandler.default)(async (req, res) => {
  const name = req.query.name || '';
  const category = req.query.category || '';
  const seller = req.query.seller || '';
  const order = req.query.order || '';
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;
  const nameFilter = name ? {
    name: {
      $regex: name,
      $options: 'i'
    }
  } : {};
  const sellerFilter = seller ? {
    seller
  } : {};
  const categoryFilter = category ? {
    category
  } : {};
  const priceFilter = min && max ? {
    price: {
      $gte: min,
      $lte: max
    }
  } : {};
  const ratingFilter = rating ? {
    rating: {
      $gte: rating
    }
  } : {};
  const sortOrder = order === 'lowest' ? {
    price: 1
  } : order === 'highest' ? {
    price: -1
  } : order === 'toprated' ? {
    rating: -1
  } : {
    _id: -1
  };
  const products = await _productModel.default.find({ ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter
  }).populate('seller', 'seller.name seller.logo').sort(sortOrder);
  res.send(products);
}));
productRouter.get('/categories', (0, _expressAsyncHandler.default)(async (req, res) => {
  const categories = await _productModel.default.find().distinct('category');
  res.send(categories);
}));
productRouter.get('/seed', (0, _expressAsyncHandler.default)(async (req, res) => {
  // await Product.remove({});
  const createdProducts = await _productModel.default.insertMany(_data.default.products);
  res.send({
    createdProducts
  });
}));
productRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id).populate('seller', 'seller.name seller.logo seller.rating seller.numReviews');

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
}));
productRouter.post('/', _utils.isAuth, _utils.isSellerOrAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = new _productModel.default({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    brand: req.body.brand,
    countInStock: req.body.countInStock,
    description: req.body.description,
    numReviews: 0,
    rating: 0,
    seller: req.body.seller
  });
  const createdProduct = await product.save();
  res.send({
    message: 'Product Created',
    product: createdProduct
  });
}));
productRouter.put('/:id', _utils.isAuth, _utils.isSellerOrAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({
      message: 'Product Updated',
      product: updatedProduct
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
}));
productRouter.delete('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);

  if (product) {
    const deleteProduct = await product.remove();
    res.send({
      message: 'Product Deleted',
      product: deleteProduct
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
}));
productRouter.post('/:id/reviews', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    if (product.reviews.find(x => x.name === req.user.name)) {
      return res.status(400).send({
        message: 'You already submitted a review'
      });
    }

    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: 'Review Created',
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1]
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found'
    });
  }
}));
var _default = productRouter;
exports.default = _default;