import React from 'react';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      fullName: '',
      creditCardNumber: '',
      expiration: '',
      cvv: '',
      errors: {
        fName: false,
        lName: false,
        street: false,
        city: false,
        state: false,
        zip: false,
        fullName: false,
        creditCardNumber: false,
        expiration: false,
        cvv: false
      }
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  // handleChange(event) {
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //   let errors = this.state.errors;

  //   switch(event) {
  //     case 'fName': errors.fName
  //   }
  // }

  handleNameChange(event) {
    event.preventDefault();
    // const creditCardVal = this.state.errors.creditCardVal;
    // const addressVal = this.state.errors.creditCardVal;
    const rules = /(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/g;
    const isNameValid = rules.test(event.target.value);
    const nameValCopy = { ...this.state.errors.nameVal };
    nameValCopy.nameVal = isNameValid;
    this.setState({
      name: event.target.value,
      errors: nameValCopy
    });
  }

  handleCreditCardChange(event) {
    event.preventDefault();
    // const nameVal = this.state.errors.nameVal;
    // const addressVal = this.state.errors.creditCardVal;
    const rules = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g;
    const isCreditCardValid = rules.test(event.target.value);
    const creditCardValCopy = { ...this.state.errors.creditCardVal };
    creditCardValCopy.creditCardVal = isCreditCardValid;
    this.setState({
      creditCard: event.target.value,
      errors: creditCardValCopy
    });
  }

  handleAddressChange(event) {
    event.preventDefault();
    // const creditCardVal = this.state.errors.nameVal;
    // const nameVal = this.state.errors.nameVal;
    const rules = /./;
    const isAddressValid = rules.test(event.target.value);
    const addressValCopy = { ...this.state.errors.addressVal };
    addressValCopy.addressVal = isAddressValid;
    this.setState({
      address: event.target.value,
      errors: addressValCopy
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
      <div className="container-fluid outermost-container">
        <div className="row m-0">
          <div className="col col-8">
            <h2>My Cart</h2>
            <p className="order-total">{`Order Total: ${totalPriceFormatted}`}</p>
            <div className="row">
              <h4 className="m-3">Shipping Information</h4>
            </div>
            <div className="row mt-2">
              <div className=" col-5 checkout-field">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
                <small className={`form-text text-muted ${this.state.errors.nameVal ? 'green' : 'red'}`}> { this.state.errors.nameVal ? 'Name is valid!' : 'Name is invalid' } </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />

                <small className={`form-text text-muted ${this.state.errors.nameVal ? 'green' : 'red'}`}> {this.state.errors.nameVal ? 'Name is valid!' : 'Name is invalid'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Street Address"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleAddressChange} />

                <small className={`form-text text-muted ${this.state.errors.addressVal ? 'green' : 'red'}`}> {this.state.errors.addressVal ? 'Address entry is valid' : 'Address entry is required'} </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="City"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleAddressChange} />

                <small className={`form-text text-muted ${this.state.errors.addressVal ? 'green' : 'red'}`}> {this.state.errors.addressVal ? 'Address entry is valid' : 'Address entry is required'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="State"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleAddressChange} />

                <small className={`form-text text-muted ${this.state.errors.addressVal ? 'green' : 'red'}`}> {this.state.errors.addressVal ? 'Address entry is valid' : 'Address entry is required'} </small>
              </div>
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleAddressChange} />
                <small className={`form-text text-muted ${this.state.errors.addressVal ? 'green' : 'red'}`}> {this.state.errors.addressVal ? 'Address entry is valid' : 'Address entry is required'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <h4 className="m-3">Payment Information</h4>
            </div>
            <div className="row mt-2">
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleCreditCardChange} />

                <small className={`form-text text-muted ${this.state.errors.creditCardVal ? 'green' : 'red'}`}> {this.state.errors.creditCardVal ? 'Credit card entry is valid!' : 'Credit card entry is invalid'} </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Credit Card Number"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleCreditCardChange} />

                <small className={`form-text text-muted ${this.state.errors.creditCardVal ? 'green' : 'red'}`}> {this.state.errors.creditCardVal ? 'Credit card entry is valid!' : 'Credit card entry is invalid'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleCreditCardChange} />

                <small className={`form-text text-muted ${this.state.errors.creditCardVal ? 'green' : 'red'}`}> {this.state.errors.creditCardVal ? 'Credit card entry is valid!' : 'Credit card entry is invalid'} </small>
              </div>
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="CVV"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleCreditCardChange} />

                <small className={`form-text text-muted ${this.state.errors.creditCardVal ? 'green' : 'red'}`}> {this.state.errors.creditCardVal ? 'Credit card entry is valid!' : 'Credit card entry is invalid'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <button onClick={e => {
                e.preventDefault();
                this.props.placeOrder(this.state);
              }} className="btn btn-primary">Submit</button>
            </div>
          </div>
          <div className="col-4">Summary</div>
        </div>
      </div>
    );
  }
}
