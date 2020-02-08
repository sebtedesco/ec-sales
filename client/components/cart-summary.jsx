import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  return (
    <>
      <div className="col-2 back-to-catalog">
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
        <div>
          <button type="button" className="btn btn-primary checkout-button" onClick={() => props.setViewMethod('checkout', {})}>Checkout</button>
        </div>
      </div>
    </>
  );
}
