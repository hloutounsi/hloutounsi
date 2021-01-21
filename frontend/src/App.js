import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
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

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
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
            <Route path="/signin" component={SigninScreen}></Route>
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
          <footer className="row center" style={{ backgroundColor: "#BB1918", color: "#F8EBC0" }}>All right reserved</footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
