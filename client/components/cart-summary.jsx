import React from 'react';
import CartSummaryItem from './cart-summary-item';
import BottomNav from './bottom-nav';

export default function CartSummary(props) {
  const arrOfCartItems = props.cart;
  if (arrOfCartItems.length === 0) {
    return (
      <>
        <div className="container white-background">
          <div className="d-inline-block back-to-catalog">
            <p className="back-to-catalog" onClick={() => props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
          </div>
          <h2 className="p-5">Your cart is empty.</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container container-bottom-nav cart">
        <div className="d-inline-block back-to-catalog">
          <div onClick={() => props.setViewMethod('catalog', {})}>{<i className="fas fa-arrow-circle-left"></i>} Back to Catalog</div>
        </div>
        <div className="row">
          <div className="col p-4">
            {
              props.cart.map(cartItem => {
                return <CartSummaryItem
                  key={cartItem.cartItemId}
                  cartItem={cartItem}
                  addToCart={props.addToCart}
                />;
              })
            }
          </div>
        </div>
      </div>
      <BottomNav cart={props.cart} view={props.view} setViewMethod={props.setViewMethod}/>
    </>
  );
}
