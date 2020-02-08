import React from 'react';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCreditCardChange(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  render() {
    return (
      <form>
        <div className="nav"></div>
        <h2>My Cart</h2>
        <p id="order-total">Order Total: $</p>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={this.handleNameChange}/>
          <small className="form-text text-muted">Please enter full name.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Credit Card</label>
          <input
            type="text"
            className="form-control"
            value={this.state.creditCard}
            onChange={this.handleCreditCardChange} />
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
      </form>
    );
  }
}
