import React from 'react';

export default function BottomNav(props) {
  const arrOfCartItems = props.cart;
  let totalPrice = null;
  arrOfCartItems.forEach(item => {
    totalPrice += item.price;
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

  // console.log('setView: ', setView);
  // console.log('buttonText: ', buttonText);
  // console.log('totalText: ', totalText);

  function buttonClicked() {
    if (setView === 'confirmation') {
      if (props.errorFree) {
        return () => props.setViewMethod(setView, {});
      } else {
        return;
      }
    }
    return () => props.setViewMethod(setView, {});
  }

  return (
    <div className="container-fluid">
      <div className="bottom-nav row justify-content-between">
        <p className="col order-total">{totalText} {totalPriceFormatted}</p>
        <button type="button" className="btn btn-primary mr-5" onClick={buttonClicked()}>{buttonText}</button>
      </div>
    </div>
  );
}
