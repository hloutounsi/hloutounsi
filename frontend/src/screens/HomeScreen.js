import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  slideImg: {
    maxWidth: window.screen.width > 1010 ? '100%' : '30rem',
  }
}));

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    window.scrollTo(0, 0);
    dispatch(listTopSellers());
  }, [dispatch]);
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {userInfo && <Grid item xs={12}>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>Aucun vendeur trouvé</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img
                    src={window.screen.width > 1010 ? seller.seller.logo : seller.seller.logo2}
                    alt={seller.seller.name}
                    className={classes.slideImg}
                  />
                  <p className="legend" style={{ width: '40%', left: '95%' }}>Vendeur {seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      </Grid>}
      <Grid item xs={12}>
      <h2>Produits populaires</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>Aucun produit trouvé</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
      </Grid>
    </Grid>
  );
}
