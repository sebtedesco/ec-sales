import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {

  const arrOfCartItems = props.cart;
  let totalPrice = null;
  arrOfCartItems.forEach(item => {
    totalPrice += item.price;
  });
  const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;

  return (
    <>
      <div className="col-2 back-to-catalog">
        <p onClick={() => props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
      </div>
      <p className="order-total">Cart Total: {totalPriceFormatted}</p>
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
