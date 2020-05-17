import React from 'react';

export default function BottomNav(props) {
  const arrOfCartItems = props.cart;
  let itemTotalPrice = null;
  let totalPrice = null;
  arrOfCartItems.forEach(item => {
    itemTotalPrice = (item.price * item.quantity);
    totalPrice += itemTotalPrice;
  });
  const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
  const currentView = props.view;
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

  function buttonClicked() {
    // console.log('setView: ', setView);
    // console.log('buttonText: ', buttonText);
    // console.log('totalText: ', totalText);
    if (setView === 'confirmation') {
      if (props.errorFree) {
        props.placeOrder(props.orderDetails);
        // props.setViewMethod(setView, {});
        return;
      } else {
        return;
      }
    }
    props.setViewMethod(setView, {});
  }

  return (
    <div className="container">
      <div className="bottom-nav row justify-content-between">
        <div className="col order-total">{totalText} {totalPriceFormatted}</div>
        <button type="button" className="btn btn-primary checkout-button" onClick={ buttonClicked }>{buttonText}</button>
      </div>
    </div>
  );
}
