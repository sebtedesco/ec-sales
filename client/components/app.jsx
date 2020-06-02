import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import Checkout from './checkout-form';
import ConsentModal from './consent-modal';
import Confirmation from './confirmation-page';
// import GoToCartModal from './go-to-cart-modal';

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
    this.removeFromCart = this.removeFromCart.bind(this);

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
    let numberOfItemsInCart = null;
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        for (const index in data) {
          numberOfItemsInCart += data[index].quantity;
        }
        this.setState({
          cart: data,
          cartQuantity: numberOfItemsInCart
        });
      })
      .catch(err => console.error(err));
  }

  addToCart(productObj) {
    // console.log('productObj: ', productObj);
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
        // eslint-disable-next-line no-console
        console.log('response add to cart: ', response);
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

  removeFromCart(productObj, amount) {
    const productAndAmount = {
      productObj,
      amount
    };
    // eslint-disable-next-line no-console
    console.log(productAndAmount);
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productAndAmount)
    };
    fetch('api/cart', init)
      .then(response => {
        // eslint-disable-next-line no-console
        return response.json();
      })
      .then(cartIdResponse => {
        const cartId = cartIdResponse.cartId;
        const quantityToDelete = cartIdResponse.quantityToDelete;
        const quantityInCart = cartIdResponse.quantityInCart;
        let newCart = null;
        let quantityToRemoveFromCart = null;
        const newCartArr = [...this.state.cart];
        if (quantityToDelete === 'ALL' || quantityInCart === 1) {
          quantityToRemoveFromCart = quantityInCart;
          const newCartArrWithoutDeleted = newCartArr.filter(toFilter => toFilter.cartItemId !== cartId);
          newCart = newCartArrWithoutDeleted;
        } else {
          quantityToRemoveFromCart = 1;
          newCart = newCartArr.map(item => {
            if (item.cartItemId === cartId) {
              const updatedItem = { ...item };
              updatedItem.quantity--;
              return updatedItem;
            } else {
              return item;
            }
          });
        }
        this.setState(prevState => {
          return {
            cart: newCart,
            cartQuantity: prevState.cartQuantity - quantityToRemoveFromCart
          };
        });
      });
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
      reactElementToDisplay = <CartSummary totalPrice={totalPriceFormatted} cart={this.state.cart} view={this.state.view.name} setViewMethod={this.setView} addToCart={this.addToCart} removeFromCart={this.removeFromCart} />;
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
