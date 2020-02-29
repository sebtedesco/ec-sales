import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const arrOfCartItems = props.cart;
  if (arrOfCartItems.length === 0) {
    return (
      <>
        <div className="container cart-summary">
          <div className="d-inline-block back-to-catalog">
            <p onClick={() => props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
          </div>
          <h2>Your cart is empty.</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container cart-summary">
        <div className="row">
          <div className="col">
            <div className="d-inline-block back-to-catalog">
              <p onClick={() => props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
            </div>
            <div className="p-4">
              {
                props.cart.map(cartItem => {
                  return <CartSummaryItem
                    key={cartItem.cartItemId}
                    cartItem={cartItem}
                  />;
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="bottom-nav row justify-content-between">
          <p className="col order-total">Cart Total: {props.totalPrice}</p>
          <button type="button" className="btn btn-primary mr-5" onClick={() => props.setViewMethod('checkout', {})}>Checkout</button>
        </div>
      </div>
    </>
  );
}
