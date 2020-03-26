import React from 'react';
// import App from './app'

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.getProductDetails(this.props.productId);
  }

  getProductDetails(productIdToFetch) {
    const init = {
      method: 'GET'
    };
    fetch(`/api/products/${productIdToFetch}`, init)
      .then(response => {
        return response.json();
      })
      .then(product => {
        this.setState(state => ({
          product: product
        }));
      });
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      const price = `$${parseInt((this.state.product.price) / 100).toFixed(2)}`;
      return (
        <div className="container outermost-container container-no-bottom mt-5">
          <div className="d-inline-block back-to-catalog">
            <p onClick={() => this.props.setViewMethod('catalog', {})}>{'<'} Back to Catalog</p>
          </div>
          <div className="details-inner-container p-4">
            <div className="row">
            </div>
            <div className="row">
              <div className="col-lg">
                <form className="imageDetails">
                  <img
                    className="product-image-details"
                    src={this.state.product.image}
                    alt="image of selected product"
                  />
                </form>
              </div>
              <div className="col">
                <div className="card-body p-2">
                  <h4 className="card-title">{this.state.product.name}</h4>
                  <p className="card-text">{price}</p>
                  <p className="card-text">{this.state.product.shortDescription}</p>
                  <button type="button" className="btn btn-primary float-right" onClick={() => { this.props.addToCart(this.state.product); this.props.setViewMethod('catalog', {}); }}
                  >Add to Cart</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mt-3">
                <p>{ this.state.product.longDescription}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
