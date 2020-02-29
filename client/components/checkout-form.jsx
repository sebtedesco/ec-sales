/* eslint-disable */
import React from 'react';
import BottomNav from './bottom-nav'

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
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const errors = { ...this.state.errors };
    errors[name] = false
    this.setState({
      [name]: value,
      errors
    })
  };

  handleValidation(event) {
    const name = event.target.name;
    console.log('name: ', name)
    const errors = { ...this.state.errors };
    const value = event.target.value;
    const oneWordRegex = new RegExp(/^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/);
    const streetRegex = new RegExp(/\d+\w+\s\w+\s\w+/);
    const zipRegex = new RegExp(/^\d{5}(\-?\d{4})?$/);
    const fullNameRegex = new RegExp(/(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/)
    const ccRegex = new RegExp(/(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g);
    const expRegex = new RegExp(/^(0[1-9]|1[012])[ -\/]\d\d$/);
    const cvvRegex = new RegExp(/^[0-9]{3,4}$/);

    switch (name) {
      case 'fName':
      case 'lName':
      case 'city':
      case 'state':
        if(!oneWordRegex.test(this.state[name])){
          console.log('yep')
          errors[name] = true;
          this.setState({
            errors
          })
          console.log('name: ', name)
          console.log('error state: ', errors[name])
        };
        break;
      case 'street':
        if (!streetRegex.test(this.state[name])) {
          errors.street = true;
          this.setState({
            errors
          })
        };
        break;
      case 'zip':
        if (!zipRegex.test(this.state[name])) {
          errors.zip = true;
          this.setState({
            errors
          })
        };
        break;
      case 'fullName':
        if (!fullNameRegex.test(this.state[name])) {
          errors.fullName = true;
          this.setState({
            errors
          })
        };
        break;
      case 'creditCardNumber':
        if (!ccRegex.test(this.state[name])) {
          errors.creditCardNumber = true;
          this.setState({
            errors
          })
        };
        break;
      case 'expiration':
        if (!expRegex.test(this.state[name])) {
          errors.expiration = true;
          this.setState({
            errors
          })
        };
        break;
      case 'cvv':
        if (!cvvRegex.test(this.state[name])) {
          errors.cvv = true;
          this.setState({
            errors
          })
        };
    }
    this.setState({ errors });
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
                  name="fName"
                  value={this.state.name}
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.fName ? 'red' : ''}`}> {this.state.errors.fName ? 'First name is invalid' : '' } </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lName"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.lName ? 'red' : ''}`}> {this.state.errors.lName ? 'Last name is invalid' : ''} </small>
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
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />

                <small className={`form-text text-muted ${this.state.errors.street ? 'red' : ''}`}> {this.state.errors.street ? 'Street is invalid' : ''} </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.city ? 'red' : ''}`}> {this.state.errors.city ? 'City is invalid' : ''} </small>
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
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.state ? 'red' : ''}`}> {this.state.errors.state ? 'State is invalid' : ''} </small>
              </div>
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="Zip Code"
                  name="zip"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.zip ? 'red' : ''}`}> {this.state.errors.zip ? 'Zip Code is invalid' : ''} </small>
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
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.fullName ? 'red' : ''}`}> {this.state.errors.fullName ? 'Full name is invalid' : ''} </small>
              </div>
              <div className="col-5 checkout-field">
                <input
                  type="text"
                  placeholder="Credit Card Number"
                  name="creditCardNumber"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.creditCardNumber ? 'red' : ''}`}> {this.state.errors.creditCardNumber ? 'Credit card number is invalid' : ''} </small>
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
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                />
                <small className={`form-text text-muted ${this.state.errors.expiration ? 'red' : ''}`}> {this.state.errors.expiration ? 'Expiration date is invalid' : ''} </small>
              </div>
              <div className="col-3 checkout-field">
                <input
                  type="text"
                  placeholder="CVV"
                  name="cvv"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={this.handleChange}
                  onBlur={this.handleValidation}
                  />
                <small className={`form-text text-muted ${this.state.errors.cvv ? 'red' : ''}`}> {this.state.errors.cvv ? 'CVV is invalid' : ''} </small>
              </div>
            </div>
            <div className="container-fluid">
              <div className="bottom-nav row justify-content-between">
                <p className="col order-total">Cart Total: {this.props.totalPrice}</p>
                <button type="button" className="btn btn-primary mr-5" onClick={() => { this.props.placeOrder(this.props.cart); this.props.setViewMethod('catalog', {})}}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
