import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <nav className="navbar dark-background">
        <div className="header-title" onClick={() => this.props.setViewMethod('catalog', {})}>
          Eric Clapton Shop
        </div>
        <button type="button" className="btn btn-light" onClick={() => this.props.setViewMethod('cart', {})}>
          <h5 className="m-0"> <i className="fas fa-shopping-cart"></i> {this.props.cartQuantity} </h5>
        </button>
      </nav>
    );
  }
}
