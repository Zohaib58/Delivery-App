import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleFav } from '../../util/ProductAPIs';
import './card.css';

const Product = ({ curProduct, onClick }) => {
  const { _id, name, image, price, category, isFav, vendor } = curProduct;

  const [isFavorite, setIsFavorite] = useState(isFav);

  const toggleFavorite = async() => {
    const res = await toggleFav({productID:_id})
    setIsFavorite(!isFavorite);
  };

  const handleFavClick = (event) => {
    event.stopPropagation();
    toggleFavorite(); 
  };

  return (
    <Card className="product-card" onClick={onClick}>
      <button className= "favButton" onClick={handleFavClick} id={`${_id}`}>
        <FontAwesomeIcon icon={faHeart} color={isFavorite ? '#1baa97' : 'grey'} />
      </button>
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <p>{vendor}</p>
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
        <Card.Text className="product-price">{`PKR ${price}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
