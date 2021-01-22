import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} style={{ height: 200 }}/>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        {(product.countInStock < 7 && product.countInStock ==! 0) && <Alert style={{ fontSize: "inherit" }} severity="error">
            {`Il reste ${product.countInStock * 0.5} Kg en stock`}
          </Alert>}
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">{product.price}‎€</div>
          {product.seller && <div>
            <Link to={`/seller/${product.seller._id}`}>
              Vendeur {product.seller.seller.name}
            </Link>
          </div>}
        </div>
      </div>
    </div>
  );
}
