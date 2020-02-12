import React from 'react';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: '',
      validation: {
        nameVal: false,
        creditCardVal: false,
        addressVal: false
      }
    };

    this.validateName = this.validateName.bind(this);
    this.validateCreditCard = this.validateCreditCard.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(event) {
  }

  validateName(event) {
    const rules = /(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/g;
    const isNameValid = rules.test(event.target.value);
    const nameValCopy = { ...this.state.validation.nameVal };
    nameValCopy.nameVal = isNameValid;
    this.setState({
      name: event.target.value,
      validation: nameValCopy
    });
  }

  validateCreditCard(event) {
    const rules = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g;
    const isCreditCardValid = rules.test(event.target.value);
    const creditCardValCopy = { ...this.state.validation.creditCardVal };
    creditCardValCopy.creditCardVal = isCreditCardValid;
    this.setState({
      creditCard: event.target.value,
      validation: creditCardValCopy
    });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
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
                onChange={this.validateName}
              />
              <small className={'form-text text-muted'}> { this.state.validation.nameVal ? 'Name is valid!' : 'Name is invalid' } </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Credit Card</label>
              <input
                type="text"
                className="form-control"
                value={this.state.creditCard}
                onChange={this.validateCreditCard} />
              <small className={'form-text text-muted'}> {this.state.validation.creditCardVal ? 'Credit card entry is valid!' : 'Credit card entry is invalid'} </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Shipping Address</label>
              <textarea
                type="text"
                className="form-control"
                rows="3"
                value={this.state.address}
                onChange={this.handleAddressChange} />
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
