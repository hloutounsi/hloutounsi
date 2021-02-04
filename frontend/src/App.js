import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from './components/TextField';
import Snackbar from './components/Snackbar';
import Button from './components/Button';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import CardContent from '@material-ui/core/CardContent';
import RoomIcon from '@material-ui/icons/Room';
import Typography from '@material-ui/core/Typography';
import theme from './theme';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductNewScreen from './screens/ProductNewScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import ContactScreen from './screens/ContactScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'transparent',
    color: "#fff",
    fontSize: "inherit",
    marginBottom: 8,
    minWidth: 300,
    margin: 8
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: "#FFEFA5",
    padding: theme.spacing(3)
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
});

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="grid-container">
          <Header
          cartItems={cartItems}
          userInfo={userInfo}
          setSidebarIsOpen={setSidebarIsOpen}
          signoutHandler={signoutHandler}
          />
          <aside className={sidebarIsOpen ? 'open' : ''}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button
                  onClick={() => setSidebarIsOpen(false)}
                  className="close-sidebar"
                  type="button"
                >
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/search/category/${c}`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </aside>
          <main>
            <Route path="/seller/:id" component={SellerScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route
              path="/product/:id/edit"
              component={ProductEditScreen}
              exact
            ></Route>
            <Route
              path="/product/new"
              component={ProductNewScreen}
              exact
            ></Route>
            <Route exact={true} path="/signin" component={SigninScreen}></Route>
            <Route path="/contact" component={ContactScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <PrivateRoute path="/order/:id" component={OrderScreen}></PrivateRoute>
            <PrivateRoute path="/orderhistory" component={OrderHistoryScreen}></PrivateRoute>
            <Route
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
              component={SearchScreen}
              exact
            ></Route>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
              exact
            ></AdminRoute>
            <AdminRoute
              path="/orderlist"
              component={OrderListScreen}
              exact
            ></AdminRoute>
            <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <SellerRoute
              path="/productlist/seller"
              component={ProductListScreen}
            ></SellerRoute>
            <SellerRoute
              path="/orderlist/seller"
              component={OrderListScreen}
            ></SellerRoute>

            <Route path="/" component={HomeScreen} exact></Route>
          </main>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2} style={{ backgroundColor: "#BB1918", padding: 8 }}>
                  <Grid className={classes.paper}>
                  <CardContent>
                    <div class="fb-page" data-href="https://www.facebook.com/Malika-110148140948324/" data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/Malika-110148140948324/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Malika-110148140948324/">Malika</a></blockquote></div>
                    </CardContent>
                  </Grid>
                  <Grid className={classes.paper}>
                  <CardContent>
                    <div className={classes.card}>
                      <form onSubmit={handleSubmit} className={classes.cardContent}>
                        <Typography variant="h2" component="h2" gutterBottom color="primary">
                          NEWSLETTER
                        </Typography>
                        <Typography variant="h5" color="primary">
                          Abonnez-vous et recevoir notre dernières nouvelles
                        </Typography>
                        <TextField noBorder className={classes.textField} placeholder="Your email" />
                        <Button type="submit" color="primary" variant="contained" className={classes.button}>
                          Abonnez vous
                        </Button>
                      </form>
                    </div>
                    </CardContent>
                  </Grid>
                  <Grid className={classes.paper}>
                      <CardContent>
                        <img src="https://hloutounsi.com/images/logo.png" width={250} style={{backgroundColor: "#fff", padding: 10}}/>
                        <h3 style={{fontSize: "2rem"}}>
                          CONTACT
                        </h3>
                        <Typography variant="body2" component="p" style={{fontSize: "inherit"}}>
                          <RoomIcon /> rue du Lavoir Metz 57000, France
                          <br />
                          <PhoneAndroidIcon /> <a href="tel://+33766122563" style={{ color: "#fff" }}>+33 7 66 12 25 63</a>
                          <br />
                          <EmailIcon /> <a href="mailto:contact@hloutounsi.com" style={{ color: "#fff" }}>contact@hloutounsi.com</a>
                          <br />
                          <ContactMailIcon /> <Link to="/#/contact" style={{ color: "#fff" }}>Contactez-nous</Link>
                        </Typography>
                      </CardContent>
                  </Grid>
              </Grid>
              <Grid container style={{ backgroundColor: "#eee", padding: 8 }}>
                © 2021 Hlou Tounsi. Tous droits réservés
              </Grid>
            </Grid>
        </div>
        <Snackbar
          open={open}
          onClose={handleClose}
          message="Nous vous informerons de la date de l'arrivée de la premiere commande de gâteau"
      />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
