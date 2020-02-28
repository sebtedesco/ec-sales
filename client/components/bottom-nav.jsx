import React from 'react';

export default function BottomNav(props) {
  const arrOfCartItems = props.cart;
  let totalPrice = null;
  arrOfCartItems.forEach(item => {
    totalPrice += item.price;
  });
  const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
  return (
    <div className="container-fluid">
      <div className="bottom-nav row justify-content-between">
        <p className="col order-total">Cart Total: {totalPriceFormatted}</p>
        <button type="button" className="btn btn-primary mr-5" onClick={() => props.setView('checkout', {})}>Checkout</button>
      </div>
    </div>
  );
}
