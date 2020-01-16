import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(setViewName, setViewParams) {
    this.setState({
      view: {
        name: setViewName,
        params: setViewParams
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error(err));
  }

  addToCart(productObj) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productObj)
    };
    fetch('/api/cart', init)
      .then(response => {
        response.json();
      })
      .then(response => {
        const newCartArr = [...this.state.cart];
        newCartArr.push(productObj);
        this.setState({ cart: newCartArr });
      })
      .catch(err => console.error(err));
  }

  render() {
    let reactElementToDisplay = null;
    if (this.state.view.name === 'catalog') {
      reactElementToDisplay = <ProductList setViewMethod={this.setView} />;
    } else {
      reactElementToDisplay = <ProductDetails productId={this.state.view.params.productId} setViewMethod={this.setView} addToCart={this.addToCart}/>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Header cartItemCount={this.state.cart.length}/>
            { reactElementToDisplay }
          </div>
        </div>
      </div>
    );
  }
}
