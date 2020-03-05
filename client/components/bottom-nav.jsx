import React from 'react';

export default function BottomNav(props) {
  const arrOfCartItems = props.cart;
  let totalPrice = null;
  arrOfCartItems.forEach(item => {
    totalPrice += item.price;
  });
  const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
  const currentView = props.view;
  // const carView = 'Checkout';
  // const confirmationView = 'Go Home';
  let setView;
  let buttonText;
  let totalText;

  switch (currentView) {
    case 'cart':
      setView = 'checkout';
      buttonText = 'Checkout';
      totalText = 'Cart Total:';
      break;
    case 'checkout':
      setView = 'confirmation';
      buttonText = 'Place Order';
      totalText = 'Order Total:';
      break;
    case 'confirmation':
      setView = 'catalog';
      buttonText = 'Go Home';
      totalText = 'Purchase Total:';
      break;
  }

  return (
    <div className="container-fluid">
      <div className="bottom-nav row justify-content-between">
        <p className="col order-total">{totalText} {totalPriceFormatted}</p>
        <button type="button" className="btn btn-primary mr-5" onClick={() => props.setViewMethod(setView, {})}>{buttonText}</button>
      </div>
    </div>
  );
}
