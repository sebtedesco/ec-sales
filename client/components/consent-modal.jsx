import React from 'react';

export default function ConsentModal(props) {
  return (
    <div className="modal-background container position-fixed w-100 h-100">
      <div className="consent-modal">
        <h2>Important!</h2>
        <p>This site is for educational purposes ONLY. You cannot purchase electric cars here.</p>
        <p>This is silly nonsensical electric car shopping app to give you an idea of the cost and price comparisons of electric cars.
        </p>
        <button type="button" className="btn btn-danger" onClick={props.hideConsentModal}>Proceed</button>
      </div>
    </div>
  );
}
