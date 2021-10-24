"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _orderModel = _interopRequireDefault(require("../models/orderModel.js"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

orderRouter.get('/', _utils.isAuth, _utils.isSellerOrAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const seller = req.query.seller || '';
  const sellerFilter = seller ? {
    seller
  } : {};
  const orders = await _orderModel.default.find({ ...sellerFilter
  }).populate('user', 'name');
  res.send(orders);
}));
orderRouter.get('/mine', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderModel.default.find({
    user: req.user._id
  });
  res.send(orders);
}));
orderRouter.post('/', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({
      message: 'Panier Vide'
    });
  } else {
    const address = req.body.shippingAddress;
    delete address.shippingPrice; // delete address.type;

    address.country = "France";
    console.log(address);
    const order = new _orderModel.default({
      seller: req.body.orderItems[0].seller,
      orderItems: req.body.orderItems,
      shippingAddress: address,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id
    });
    const createdOrder = await order.save();
    res.status(201).send({
      message: 'Nouvelle commande créée',
      order: createdOrder
    });
  }
}));
orderRouter.get('/:id', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({
      message: 'Order Not Found'
    });
  }
}));
orderRouter.put('/:id/pay', _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };
    const updatedOrder = await order.save();
    res.send({
      message: 'Order Paid',
      order: updatedOrder
    });
  } else {
    res.status(404).send({
      message: 'Order Not Found'
    });
  }
}));
orderRouter.delete('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    const deleteOrder = await order.remove();
    res.send({
      message: 'Order Deleted',
      order: deleteOrder
    });
  } else {
    res.status(404).send({
      message: 'Order Not Found'
    });
  }
}));
orderRouter.put('/:id/deliver', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({
      message: 'Order Delivered',
      order: updatedOrder
    });
  } else {
    res.status(404).send({
      message: 'Order Not Found'
    });
  }
}));
var _default = orderRouter;
exports.default = _default;