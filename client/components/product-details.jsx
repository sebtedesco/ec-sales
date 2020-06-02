import React from 'react';
// import App from './app'

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
      // modal: false
    };

    this.consentModal = this.consentModal.bind(this);
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

  consentModal() {
    // console.log('hello there');
    this.setState({ consentModal: !this.state.consentModal });
    // console.log(this.state.consentModal);
  }

  render() {
    if (this.state.product === null) {
      return null;
    } else {
      const price = `$${parseInt((this.state.product.price) / 100).toFixed(2)}`;
      return (
        <>
          <div className="container container-no-bottom white-background">
            <div className="d-inline-block back-to-catalog">
              <p onClick={() => this.props.setViewMethod('catalog', {})}>{<i className="fas fa-arrow-circle-left"></i>} Back to Catalog</p>
            </div>
            <div className="details-inner-container p-4 m-3">
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
                    {/* <button type="button" className="btn btn-primary float-right" onClick={() => { this.props.addToCart(this.state.product), this.consentModal(); }} >Add to Cart</button> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-3">
                  <p>{ this.state.product.longDescription}</p>
                </div>
              </div>
              <div className={`modal-background container position-fixed w-100 h-100 ${!this.state.modal ? 'd-none' : ''}`}>
                <div className="consent-modal">
                  <h1>Item has been added to cart.</h1>
                  <p>This site is for educational purposes ONLY. You cannot purchase Eric Clapton memorabilia here.</p>
                  {/* <button type="button" className="btn btn-success" onClick={this.props.setViewMethod('catalog')}>Keep Shopping</button>
                  <button type="button" className="btn btn-success" onClick={props.setViewMethod('cart')}>Go To Cart</button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
