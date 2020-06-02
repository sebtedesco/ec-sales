import React from 'react';

export default function ConsentModal(props) {
  return (
    <div className="modal-background container position-fixed w-100 h-100">
      <div className="consent-modal">
        <h1>Item has been added to cart.</h1>
        <p>This site is for educational purposes ONLY. You cannot purchase Eric Clapton memorabilia here.</p>
        <button type="button" className="btn btn-success" onClick={props.setvView('catalog')}>Keep Shopping</button>
        <button type="button" className="btn btn-success" onClick={props.setvView('cart')}>Go To Cart</button>
      </div>
    </div>
  );
}
