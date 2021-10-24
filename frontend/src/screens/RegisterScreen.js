import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Le mot de passe et le mot de passe de confirmation ne correspondent pas');
    } else {
      let data = {
        name,
        email,
        type: "welcome",
      };
  
      try {
        await axios.post("api/send", data)
      } catch (error) {
        console.log(error);
      }
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Créer votre compte</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <TextField
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
            label="Nom et prénom"
          />
        </div>
        <div>
          <TextField
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
            label="Mot de passe"
          />
        </div>
        <div>
          <TextField
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirmer mot de passe"
          />
        </div>
        <div>
          <label />
          <Button color="primary" type="submit" variant="contained">
            Inscription
          </Button>
        </div>
        <div>
          <label />
          <div>
            Vous avez déjà un compte?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Connectez-vous</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
