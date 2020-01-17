import React from 'react';

export default function CartSummaryItem(props) {
  const price = `$${parseInt((props.cartItem.price) / 100).toFixed(2)}`;
  return (
    <div className="container border mt-2 mb-2 w-75">
      <div className="row">
        <div className="col">
          <div className="col-4 d-inline-block">
            <img src={props.cartItem.image} alt="cartItem image" className="cart-image d-inline-block p-3" />
          </div>
          <div className="col-8 d-inline-block pl-8">
            <h4 className="card-title">{props.cartItem.name}</h4>
            <p className="card-text">{price}</p>
            <p className="card-text">{props.cartItem.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
