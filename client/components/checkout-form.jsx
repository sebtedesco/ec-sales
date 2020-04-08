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
    event.preventDefault();
    // const { name, value } = event.target;
    console.log('event', event);
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value })
  };

  handleValidation(event) {
    const name = event.target.name;
    const errors = { ...this.state.errors };
    const value = event.target.value;

    const oneWordRegex = new RegExp(/^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z]+))$/);
    const streetRegex = new RegExp(/\d+\w+\s\w+\s\w+/);
    const zipRegex = new RegExp(/^\d{5}(\-?\d{4})?$/);
    // const fullNameRegex = new RegExp(/^(?:([a-zA-Z]{2,4}\.){0,1} ?([a-zA-Z]{2,24})) ([a-zA-Z]{1,1}  \. ){0,1}([a-zA-Z]{2,24} ){0,2}([A-Za-z']{2,24})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/im/);
    const ccRegex = new RegExp(/(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g);
    const mmyyRegex = new RegExp(/^(0[1-9]|1[012])[ -\/]\d\d$/);
    const cvvRegex = new RegExp(/^[0-9]{3,4}$/);


    switch (name) {
      case 'fName':
        if(!oneWordRegex.test(this.state[name])){
          console.log('validation failed for: ', name)
          this.setState(prevState => ({
            validation: {
              ...prevState.errors,
              fName: true
            }
          }));
          console.log('new fName state: ', this.state.errors.fName)
        };
        break;
      case 'lName':
        if (!oneWordRegex.test(this.state[name])) {
          this.setState(prevState => ({
            validation: {
              ...prevState.errors,
              lName: true
            }
          }));
        };;
        break;
      case 'street':
        if (!streetRegex.test(this.state[name])) {
          this.setState(prevState => ({
            validation: {
              ...prevState.errors,
              street: true
            }
          }));
        };;
        break;
      case 'city': errors.city = value.length > 1 ? false : true;
        break;
      case 'state': errors.state = value.length > 1 ? false : true;
        break;
      case 'zip': errors.zip = value.length > 1 ? false : true;
        break;
      case 'fullName': errors.fullName = value.length > 1 ? false : true;
        break;
      case 'creditCardNumber': errors.creditCardNumber = value.length > 1 ? false : true;
        break;
      case 'expiration': errors.expiration = value.length > 1 ? false : true;
        break;
      case 'cvv': errors.cvv = value.length > 1 ? false : true;
        break;
    }

    this.setState({ errors });
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
                  // onChange={this.handleChange}
                  onBlur={this.handleChange}
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
