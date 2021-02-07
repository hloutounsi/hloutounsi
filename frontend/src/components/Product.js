import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from './Rating';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Product(props) {
  const { product } = props;
  const classes = useStyles();
  return (
  <Card className={classes.root} style={{ margin: '1rem', minHeight: 295, background: '#fffcf0' }}>
  <Link to={`/product/${product._id}`}>
    <CardMedia
      className={classes.media}
      image={product.image}
      title={product.name}
      style={{ minWidth: 300 }}
    />
    </Link>
    <CardContent style={{ padding: "0 16px" }}>
      <Typography gutterBottom variant="h5" component="h2">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
          {product.rating > 0 && <Rating rating={product.rating} numReviews={product.numReviews}></Rating>}
      </Link>
      {(product.countInStock < 7 && product.countInStock >= 0) && 
      <Alert style={{ fontSize: "inherit", marginTop: 10, padding: "0 16px" }} severity="error">
          {`Il reste ${product.countInStock * (product.weight / 1000)} Kg en stock`}
        </Alert>}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <div className="row">
          <div className="price">
            {product.newPrice ? <><span style={{ color: 'red', textDecoration: 'line-through', marginRight: 10 }}>{product.price}‎€</span>
            <span>{product.newPrice}€</span></> : <span>{product.price}‎€</span>}
            <span style={{ fontSize: '0.6em' }}>{` le ${product.weight} g (~ ${parseInt(product.brand) || 'erreur'} pièces)`}</span>
          </div>
          {product.seller && <div style={{ fontSize: '1.2em', marginTop: 9 }}>
            <Link to={`/seller/${product.seller._id}`}>
              V. {product.seller.seller.name}
            </Link>
          </div>}
        </div>
      </Typography>
    </CardContent>
  </Card>
  );
}
