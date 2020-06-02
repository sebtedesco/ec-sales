import React from 'react';
import CartSummaryItem from './cart-summary-item';
import BottomNav from './bottom-nav';

export default function Confirmation(props) {
  return (
    <>
      <div className="container container-bottom-nav">
        <h2 className="p-4">Thanks for placing a fake order!</h2>
        <div className="">
          <div className="row">
            <div className="col p-4">
              {
                props.finalOrder.map(cartItem => {
                  return <CartSummaryItem
                    key={cartItem.cartItemId}
                    cartItem={cartItem}
                    view={props.view}
                  />;
                })
              }
            </div>
          </div>
        </div>
      </div>
      <BottomNav cart={props.finalOrder} view={props.view} setViewMethod={props.setViewMethod} />
    </>
  );
}
