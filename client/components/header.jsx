import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <nav className="navbar dark-background">
        <div className="header-title" onClick={() => this.props.setViewMethod('catalog', {})}>
          Eric Clapton Souvenir Shop
        </div>
        <button type="button" className="btn btn-light" onClick={() => this.props.setViewMethod('cart', {})}>
          <h5 className="m-0"> <i className="fas fa-shopping-cart"></i> {this.props.cartItemCount} </h5>
        </button>
      </nav>
    );
  }
}

// <header className="container-fluid justify-content-between">
// <div className="row">
//   <h3>$ Wicked Sales</h3>
//   <h5 onClick={() => this.props.setViewMethod('cart', {})}>{this.props.cartItemCount} Items <i className="fas fa-shopping-cart"></i></h5>
// </div>
// </header>
