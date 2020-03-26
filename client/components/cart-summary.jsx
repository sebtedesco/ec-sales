import React from 'react';
import CartSummaryItem from './cart-summary-item';
import BottomNav from './bottom-nav';

export default function CartSummary(props) {
  const arrOfCartItems = props.cart;
  if (arrOfCartItems.length === 0) {
    return (
      <>
        <div className="container">
          <div className="d-inline-block back-to-catalog">
            <p className="back-to-catalog" onClick={() => props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
          </div>
          <h2>Your cart is empty.</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="d-inline-block back-to-catalog">
        <p onClick={() => props.setViewMethod('catalog', {})}>{<i className="fas fa-arrow-circle-left"></i>} Back to Catalog</p>
      </div>
      <div className="container outermost-container container-bottom-nav">
        <div className="row">
          <div className="col">
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
      <BottomNav cart={props.cart} view={props.view} setViewMethod={props.setViewMethod}/>
    </>
  );
}
