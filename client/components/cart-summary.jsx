import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  return (
    <>
      <div className="col-2 back-to-catalog">
        <p onClick={() => props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
      </div>
      <div>
        {
          props.cart.map(cartItem => {
            return <CartSummaryItem
              key={cartItem.cartItemId}
              cartItem={cartItem}
            />;
          })
        }
      </div>
    </>
  );
}
