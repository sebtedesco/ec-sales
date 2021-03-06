import React from 'react';

export default function CartSummaryItem(props) {
  const price = `$${parseInt((props.cartItem.price) / 100).toFixed(2)}`;
  return (
    <div className="container mt-2 mb-2 w-lg-75 cart-items">
      <div className="row">
        <div className="col d-flex align-items-center">
          <div className="col-lg-4 col-md-4 d-inline-block">
            <img
              src={props.cartItem.image}
              alt="cartItem image"
              className="cart-image d-inline-block p-3"
            />
          </div>
          <div className="col-lg-8 col-md-8 d-inline-block">
            <div className="d-flex flex-column justify-content-around">
              <h4 className="card-title">{props.cartItem.name}</h4>
              <p className="card-text">{price}</p>
              <p className="card-text">{props.cartItem.shortDescription}</p>
              <p className={`${props.view !== 'confirmation' ? 'd-none' : ''}`}>{`Quantity: ${props.cartItem.quantity}`}</p>
              <div className={`${props.view === 'confirmation' ? 'd-none' : ''}`}>
                <div className={'row d-flex align-items-center'}>
                  <div className="col-5 d-inline-block">
                    <span
                      className="plus-minus"
                      onClick={() => { props.removeFromCart(props.cartItem, 'one'); }}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </span>
                    <div className="d-inline px-3">{props.cartItem.quantity}</div>
                    <span
                      className="plus-minus"
                      onClick={() => { props.addToCart(props.cartItem); }}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </span>
                  </div>
                  <div className="col-7">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => { props.removeFromCart(props.cartItem, 'ALL'); }}
                    >Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
