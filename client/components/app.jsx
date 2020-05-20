import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import Checkout from './checkout-form';
import ConsentModal from './consent-modal';
import Confirmation from './confirmation-page';

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
      cart: [],
      cartQuantity: 0,
      finalOrder: [],
      firstVisit: true
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.showConsentModal = this.showConsentModal.bind(this);
    this.hideConsentModal = this.hideConsentModal.bind(this);

  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

  }

  showConsentModal() {
    if (this.state.firstVisit) {
      return <ConsentModal hideConsentModal={this.hideConsentModal}/>;
    }

  }

  hideConsentModal() {
    this.setState({ firstVisit: false });
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
        return response.json();
      })
      .then(response => {
        const newCartArr = [...this.state.cart];
        const newCartArrWithoutRepeat = newCartArr.filter(toFilter => toFilter.productId !== response.productId);
        newCartArrWithoutRepeat.push(response);
        this.setState(prevState => {
          return {
            cart: newCartArrWithoutRepeat,
            cartQuantity: prevState.cartQuantity + 1
          };
        });
      })
      .catch(err => console.error(err));
  }

  placeOrder(orderObject) {
    if (!orderObject.fName || !orderObject.creditCardNumber || !orderObject.street) {
      return console.error('HERE! one or more fields missing');
    }
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(orderObject)
    };
    fetch('/api/orders', init)
      .then(response => {
        this.setState({
          finalOrder: this.state.cart,
          cart: [],
          cartQuantity: 0,
          view: { name: 'confirmation' }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const arrOfCartItems = this.state.cart;
    let totalPrice = null;
    arrOfCartItems.forEach(item => {
      totalPrice += item.price;
    });
    const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
    let reactElementToDisplay = null;
    if (this.state.view.name === 'catalog') {
      reactElementToDisplay = <ProductList setViewMethod={this.setView} firstVisit={this.state.firstVisit} />;
    } else if (this.state.view.name === 'details') {
      reactElementToDisplay = <ProductDetails productId={this.state.view.params.productId} setViewMethod={this.setView} addToCart={this.addToCart}/>;
    } else if (this.state.view.name === 'cart') {
      reactElementToDisplay = <CartSummary totalPrice={totalPriceFormatted} cart={this.state.cart} view={this.state.view.name} setViewMethod={this.setView} addToCart={this.addToCart} />;
    } else if (this.state.view.name === 'checkout') {
      reactElementToDisplay = <Checkout totalPrice={totalPriceFormatted} placeOrder={this.placeOrder} view={this.state.view.name} setViewMethod={this.setView} cart={this.state.cart} />;
    } else if (this.state.view.name === 'confirmation') {
      reactElementToDisplay = <Confirmation view={this.state.view.name} finalOrder={this.state.finalOrder} setViewMethod={this.setView}/>;
    }
    return (
      <>
        {this.showConsentModal()}
        <Header cartQuantity={this.state.cartQuantity} setViewMethod={this.setView}/>
        { reactElementToDisplay }
      </>
    );
  }
}
