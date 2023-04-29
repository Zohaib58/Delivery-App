import React from 'react'
import Card from "react-bootstrap/Card";
import './card.css';

const Product = ({curProduct, onClick}) => {
    const {_id, name, image, price, category} = curProduct;

  return (
        <Card className="product-card" onClick={onClick}>
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
                <Card.Text className="product-price">{`PKR ${price}`}</Card.Text>
            </Card.Body>
        </Card>
  )
}

export default Product