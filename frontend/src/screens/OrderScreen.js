import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from "react-moment";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import { updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    const sendEmail = () => {
      const dateMin = moment().add(4, 'd').format("DD/MM/YYYY");
      const dateMax = moment().add(10, 'd').format("DD/MM/YYYY");
        let data = {
          name: order.shippingAddress.fullName,
          email: userInfo.email,
          total: order.totalPrice.toFixed(2),
          orderId: order._id,
          dateMin,
          dateMax,
          type: "payed",
          shippingType: order.shippingAddress.type ? "à domicile" : "en point relais",
        };
        try {
          Axios.post("/api/send", data);
          order.orderItems.forEach((item) => {
            Axios.get(`/api/products/${item.product}`)
            .then(response => dispatch(updateProduct({
              ...response.data,
              brand: 14,
              countInStock: response.data.countInStock - item.qty,
            })))
          });
        } catch (error) {
          console.log(error);
        }
    }
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      } else {
        console.log({...order.orderItems[0]._id})
        sendEmail();
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Commande {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
              <h2>Méthode de Livraison {order.shippingAddress.type ? "à domicile" : "en point relais"}</h2>
                <p>
                  <strong>Nom:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Adresse: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Livré à {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Non livrés</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Paiement</h2>
                <p>
                  <strong>Methode:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Payé le <Moment format="DD/MM/YYYY">{order.paidAt}</Moment> à <Moment format="hh:mm">{order.paidAt}</Moment>
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Impayé</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>les produits de commande</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {item.price}€ = {item.qty * item.price}€
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Récapitulatif de la commande</h2>
              </li>
              <li>
                <div className="row">
                  <div>Produits de commande</div>
                  <div>{order.itemsPrice.toFixed(2)}€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Livraison</div>
                  <div>{order.shippingPrice.toFixed(2)}‎€</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice.toFixed(2)}‎€</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                        currency="EUR"
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Livrer la commande
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
