import React from 'react';
import CartSummary from './cart-summary';
import BottomNav from './bottom-nav';

export default function Confirmation(props) {
  return (
    <>
      {/* <p>Thanks for placeing a fake order!</p> */}
      <CartSummary cart={props.cart}/>;
      <BottomNav cart={props.cart} view={props.view}/>;
    </>
  );
}
