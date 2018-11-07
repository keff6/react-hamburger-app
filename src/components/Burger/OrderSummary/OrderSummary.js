import React, { Component } from 'react';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
      return (
        <li key={ingKey}>
          <span style={{textTransfrom: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
        </li>
      )
    });
  
    return (
      <Wrapper>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger"
          clicked={this.props.purchaseCancelled}
        >
          CANCEL
        </Button>
        <Button
          btnType="Success"
          clicked={this.props.purchaseContinue}
        >
          CONTINUE
        </Button>
      </Wrapper>
    );
  }  
}

export default OrderSummary;
