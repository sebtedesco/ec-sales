/* eslint-disable */
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
        street: true,
        city: true,
        state: true,
        zip: true,
        fullName: true,
        creditCardNumber: true,
        expiration: true,
        cvv: true
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    // const { name, value } = event.target;
    console.log('event', event);
    const name = event.target.name;
    const value = event.target.value;
    const errors = {...this.state.errors};

    switch (name) {
      case 'fName': errors.fName = value.length > 1 ? false : true;
        break;
      case 'lName': errors.lName = value.length < 1 ? 'Last name is required' : '';
        break;
      case 'street': errors.street = value.length < 1 ? 'Street is required' : '';
        break;
      case 'city': errors.city = value.length < 1 ? 'City is required' : '';
        break;
      case 'state': errors.state = value.length < 1 ? 'State is required' : '';
        break;
      case 'zip': errors.zip = value.length < 1 ? 'Zip Code is required' : '';
        break;
      case 'fullName': errors.fullName = value.length < 1 ? 'Full Name is required' : '';
        break;
      case 'creditCardNumber': errors.creditCardNumber = value.length < 1 ? 'Credit card number is required' : '';
        break;
      case 'expiration': errors.expiration = value.length < 1 ? 'Expiration date is required' : '';
        break;
      case 'cvv': errors.cvv = value.length < 1 ? 'CVV is required' : '';
        break;
    }
    console.log('value', value);
    console.log('name', name);
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  }

  // handleNameChange(event) {
  //   event.preventDefault();
  //   const creditCardVal = this.state.errors.creditCardVal;
  //   const addressVal = this.state.errors.creditCardVal;
  //   const rules = /(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/g;
  //   const isNameValid = rules.test(event.target.value);
  //   const nameValCopy = { ...this.state.errors.nameVal };
  //   nameValCopy.nameVal = isNameValid;
  //   this.setState({
  //     name: event.target.value,
  //     errors: nameValCopy
  //   });
  // }

  // handleCreditCardChange(event) {
  //   event.preventDefault();
  //   const nameVal = this.state.errors.nameVal;
  //   const addressVal = this.state.errors.creditCardVal;
  //   const rules = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g;
  //   const isCreditCardValid = rules.test(event.target.value);
  //   const creditCardValCopy = { ...this.state.errors.creditCardVal };
  //   creditCardValCopy.creditCardVal = isCreditCardValid;
  //   this.setState({
  //     creditCard: event.target.value,
  //     errors: creditCardValCopy
  //   });
  // }

  // handleAddressChange(event) {
  //   event.preventDefault();
  //   const creditCardVal = this.state.errors.nameVal;
  //   const nameVal = this.state.errors.nameVal;
  //   const rules = /./;
  //   const isAddressValid = rules.test(event.target.value);
  //   const addressValCopy = { ...this.state.errors.addressVal };
  //   addressValCopy.addressVal = isAddressValid;
  //   this.setState({
  //     address: event.target.value,
  //     errors: addressValCopy
  //   });
  // }

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
                  name="fName"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <small className={`form-text text-muted ${this.state.errors.fName ? '' : 'green'}`}> {this.state.errors.fName ? '' : 'Name is valid' } </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lName"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <small className={`form-text text-muted ${this.state.errors.lName ? '' : 'green'}`}> {this.state.errors.lName ? '' : 'Name is valid'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.street ? '' : 'green'}`}> {this.state.errors.street ? '' : 'Name is valid'} </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.city ? '' : 'green'}`}> {this.state.errors.city ? '' : 'Name is valid'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.state ? '' : 'green'}`}> {this.state.errors.state ? '' : 'Name is valid'} </small>
              </div>
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="zip"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.zip ? '' : 'green'}`}> {this.state.errors.zip ? '' : 'Name is valid'} </small>
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
                  name="fullName"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.fullName ? '' : 'green'}`}> {this.state.errors.fullName ? '' : 'Name is valid'} </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Credit Card Number"
                  name="creditCardNumber"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.creditCardNumber ? '' : 'green'}`}> {this.state.errors.creditCardNumber ? '' : 'Name is valid'} </small>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  name="expiration"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.expiration ? '' : 'green'}`}> {this.state.errors.expiration ? '' : 'Name is valid'} </small>
              </div>
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="CVV"
                  name="cvv"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleChange} />
                <small className={`form-text text-muted ${this.state.errors.cvv ? '' : 'green'}`}> {this.state.errors.cvv ? '' : 'Name is valid'} </small>
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
