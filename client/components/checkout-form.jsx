import React from 'react';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: ''
      // validation: {
      //   nameVal: false,
      //   creditCardVal: false,
      //   addressVal: false
      // }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(event) {
    // const creditCardVal = this.state.validation.creditCardVal;
    // const addressVal = this.state.validation.creditCardVal
    // const rules = /(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/g;
    // const isNameValid = rules.test(event.target.value);
    // const nameValCopy = { ...this.state.validation.nameVal };
    // nameValCopy.nameVal = isNameValid;
    this.setState({
      name: event.target.value
      // validation: nameValCopy
    });
  }

  handleCreditCardChange(event) {
    // const nameVal = this.state.validation.nameVal;
    // const addressVal = this.state.validation.creditCardVal
    // const rules = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g;
    // const isCreditCardValid = rules.test(event.target.value);
    // const creditCardValCopy = { ...this.state.validation.creditCardVal };
    // creditCardValCopy.creditCardVal = isCreditCardValid;
    this.setState({
      creditCard: event.target.value
      // validation: creditCardValCopy
    });
  }

  handleAddressChange(event) {
    // const creditCardVal = this.state.validation.nameVal;
    // const nameVal = this.state.validation.nameVal
    // const rules = /./;
    // const isAddressValid = rules.test(event.target.value);
    // const addressValCopy = { ...this.state.validation.addressVal };
    // addressValCopy.addressVal = isAddressValid;
    this.setState({
      address: event.target.value
      // validation: addressValCopy
    });
  }

  render() {
    const arrOfCartItems = this.props.cart;
    let totalPrice = null;
    arrOfCartItems.forEach(item => {
      totalPrice += item.price;
    });
    const totalPriceFormatted = `$${parseFloat(totalPrice / 100).toFixed(2)}`;
    return (
      <form className="container outermost-container">
        <div className="row">
          <div className="col">
            <h2>My Cart</h2>
            <p className="order-total">{`Order Total: ${totalPriceFormatted}`}</p>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <small className={`form-text text-muted ${this.state.name ? 'green' : 'red'}`}> {this.state.name ? 'Name is valid!' : 'Name is required'} </small>
              {/* <small className={`form-text text-muted ${this.state.validation.nameVal ? 'green' : 'red'}`}> { this.state.validation.nameVal ? 'Name is valid!' : 'Name is invalid' } </small> */}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Credit Card</label>
              <input
                type="text"
                className="form-control"
                value={this.state.creditCard}
                onChange={this.handleCreditCardChange} />
              <small className={`form-text text-muted ${this.state.creditCard ? 'green' : 'red'}`}> {this.state.creditCard ? 'Credit card entry is valid!' : 'Credit card entry is required'} </small>
              {/* <small className={`form-text text-muted ${this.state.validation.creditCardVal ? 'green' : 'red'}`}> {this.state.validation.creditCardVal ? 'Credit card entry is valid!' : 'Credit card entry is invalid'} </small> */}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Shipping Address</label>
              <textarea
                type="text"
                className="form-control"
                rows="3"
                value={this.state.address}
                onChange={this.handleAddressChange} />
              <small className={`form-text text-muted ${this.state.address ? 'green' : 'red'}`}> {this.state.address ? 'Address entry is valid' : 'Address entry is required'} </small>
              {/* <small className={`form-text text-muted ${this.state.validation.addressVal ? 'green' : 'red'}`}> {this.state.validation.addressVal ? 'Address entry is valid' : 'Address entry is required'} </small> */}
            </div>
            <button onClick={e => {
              e.preventDefault();
              this.props.placeOrder(this.state);
            }} className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}
