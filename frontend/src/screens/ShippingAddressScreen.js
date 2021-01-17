import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import InfoIcon from '@material-ui/icons/Info';
import Moment from 'react-moment';

import { getPrice } from '../utils';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
  });
  const [isFree, setIsFree] = useState({
    relayPoint: false,
    home: false
  });
  const [shippingPrice, setShippingPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (addressMap) {
      setAddress(addressMap.name);
      setCity(addressMap.vicinity);
      setPostalCode(addressMap.address);
      setCountry(addressMap.googleAddressId);
    }
    if(getPrice(cart.cartItems) < 40) {
      setIsFree({relayPoint: false, home: false})
      setShippingPrice(state.checkedA ? 9 : 6);
    } else if(getPrice(cart.cartItems) < 70 && getPrice(cart.cartItems) >= 40) {
      setIsFree({relayPoint: true, home: false})
      setShippingPrice(state.checkedA ? 9 : 0);
    } else {
      setIsFree({relayPoint: true, home: true})
      setShippingPrice(state.checkedA ? 0 : 0);
    }
  }, [state.checkedA, state.checkedB]);

  const handleChange = (event) => {
    if(event.target.name === "checkedA") setState({ checkedB:false, checkedA: true });
    if(event.target.name === "checkedB") setState({ checkedA:false, checkedB: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if ((!newLat || !newLng) && state.checkedA) {
      moveOn = window.confirm(
        'Vous n\'avez pas défini votre position sur la carte. Continuer?'
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
          type: state.checkedA,
          shippingPrice
        })
      );
      props.history.push('/placeorder');
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
        type: state.checkedA,
        shippingPrice
      })
    );
    props.history.push('/map');
  };
  const price = getPrice(cart.cartItems);
  var date = new Date();
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Méthode de livraison</h1>
        </div>
        {(!isFree.home && ((price >= 40 && state.checkedA) || price < 40)) && <div style={{ backgroundColor: "#E09704", color: "#fff", paddingLeft: 10, fontSize: "2rem" }}>
          <p><InfoIcon style={{ fontSize: 50, float: "left", marginRight: 15 }} />
          {price < 40 && `Il vous reste ${40 - price}€ pour avoir une livraison gratuite en point relais et ${70 - price}€ à domicile `}
          {(price >= 40 && state.checkedA) && `Il vous reste ${70 - price}€ pour avoir une livraison gratuite à domicile `}
          {(price < 40 || (price >= 40 && state.checkedA)) && <Link to="/" style={{ float: "right", marginRight: 50 }}>Aller faire les courses</Link>}</p>
        </div>}
        <FormGroup row>
          <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
              color="primary"
            />
            }
            label={`Livraison à domicile ${price < 70 ? 9 : 0}€`}
          />
          <FormControlLabel
            control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label={`Livraison en point relais UPS ${price < 40 ? 6 : 0}€`}
        />
        <span style={{ color: "#BB1918", marginLeft: 11 }}>Entre <Moment format="DD/MM/YYYY">{date.setDate(date.getDate() + 4)}</Moment> et <Moment format="DD/MM/YYYY">
          {date.setDate(date.getDate() + 10)}
        </Moment>
        </span>
        </FormGroup>
        {state.checkedB && <div>
          <p>Pour séléctionner l'adresse en point de relais la plus proche de chez-vous, Veuillez cliquer sur ce lien 
            <a style={{ color: "#e29b2f", backgroundColor: "#3d1901", fontWeight: 700, borderRadius: 5, padding: "1px 3px", margin: 5 }} href="https://www.ups.com/dropoff/" target="white">UPS</a><br/>
          Et remplir l'adresse complete de point de relais dans les champs au dessous</p>
        </div>}
        {state.checkedA && <div>
          <label htmlFor="chooseOnMap">Location</label>
          <Button onClick={chooseOnMap} color="secondary" variant="contained" style={{ maxWidth: "50%" }}>
            Choisissez sur la carte
          </Button>
        </div>}
        <div>
        <TextField
          type="text"
          id="fullName"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          label="Nom et prénom"
        />
        </div>
        <div>
          <TextField
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            label="Adresse"
          />
        </div>
        <div>
          <TextField
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            label="Ville"
          />
        </div>
        <div>
          <TextField
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            label="Code Postal"
          />
        </div>
        <div>
          <TextField
            type="text"
            id="country"
            placeholder="Enter country"
            value={"France"}
            required
            label="Pays"
            disabled
          />
        </div>
        <div>
          <label />
          <Button type="submit" color="primary" disabled={!state.checkedA && !state.checkedB} variant="contained">
            Continuez
          </Button>
        </div>
      </form>
    </div>
  );
}
