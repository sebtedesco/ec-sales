import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <h3 className="col-10 pt-3 pr-3 pb-3 pl-12 d-inline-block">$ Wicked Sales</h3>
        <h5 className="col-2 d-inline-block cart-items" onClick={() => this.props.setViewMethod('cart', {})}>{this.props.cartItemCount} Items <i className="fas fa-shopping-cart"></i></h5>
      </header>
    );
  }
}
