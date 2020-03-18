import React from 'react';

export default function ConsentModal(props) {
  return (
    <div className="modal-background container position-fixed w-100 h-100">
      <div className="consent-modal">
        <h2>Important!</h2>
        <p>This site is for educational purposes ONLY. You cannot purchase Eric Clapton memorabilia here.</p>
        <button type="button" className="btn btn-danger" onClick={props.hideConsentModal}>Proceed</button>
      </div>
    </div>
  );
}
