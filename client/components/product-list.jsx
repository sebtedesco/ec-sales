import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    const init = {
      method: 'GET'
    };
    fetch('/api/products/', init)
      .then(response => {
        return response.json();
      })
      .then(products => {
        this.setState(state => ({
          products: products
        }));
      });
  }

  render() {
    return (
      <div className={`container container-no-bottom ${this.props.firstVisit ? 'overflow-hidden' : ''}`}>
        <div className="row justify-content-center">
          {
            this.state.products.map(product => {
              return <ProductListItem
                key={product.productId}
                product={product}
                setViewCallback={this.props.setViewMethod}
              />;
            })
          }
        </div>
      </div>
    );
  }
}
