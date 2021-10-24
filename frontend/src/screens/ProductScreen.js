import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
    window.scrollTo(0,0);
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">
            <Fab variant="extended" style={{ fontSize: 'inherit', margin: "2px 10px 10px" }} color="secondary">
              <ArrowBackIcon style={{ marginRight: 8 }} />
                Retour
            </Fab>
          </Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : {product.newPrice ?  product.newPrice : product.price}€</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Vendeur{' '}
                    {product.seller && <>
                      <h2>
                        <Link to={`/seller/${product.seller._id}`}>
                          {product.seller.seller.name}
                        </Link>
                      </h2>
                      <Rating
                        rating={product.seller.seller.rating}
                        numReviews={product.seller.seller.numReviews}
                      ></Rating>
                    </>
                  }
                  </li>
                  <li>
                    <div className="row">
                      <div>Prix</div>
                      <div className="price">{product.newPrice ? <><span style={{ color: 'red', textDecoration: 'line-through', marginRight: 10 }}>{product.price}‎€</span>
                        <span>{product.newPrice}€</span></> : <span>{product.price}‎€</span>}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Statut</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">En Stock</span>
                        ) : (
                          <span className="danger">Rupture de stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select> {` x 500 g (~ ${parseInt(product.brand) ? qty * parseInt(product.brand) : 'erreur'} pièces)`}
                          </div>
                        </div>
                      </li>
                      <li>
                        <Button
                          onClick={addToCartHandler}
                          color="secondary"
                          variant="contained"
                          className="block"
                        >
                          Ajouter au panier
                        </Button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Commentaires</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Il n'y a pas encore d'avis</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Rédiger un avis client</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Évaluation</label>
                      <Select
                        id="rating"
                        native
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="1">1- Mauvais</option>
                        <option value="2">2- Passable</option>
                        <option value="3">3- Bien</option>
                        <option value="4">4- très bien</option>
                        <option value="5">5- Excellent</option>
                      </Select>
                    </div>
                    <div>
                      <TextareaAutosize
                        id="comment"
                        label="Commentaire"
                        placeholder="Entrer la commentaire"
                        multiline
                        rowsMin={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ minWidth: '50%' }}
                      />
                    </div>
                    <div>
                      <label />
                      <Button
                          color="primary"
                          variant="contained"
                          className="block"
                          type="submit"
                        >
                          Envoyer
                        </Button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    S'il vous Plaît, veuillez de <Link to="/signin">Se connecter</Link> pour voir les avis
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
