import React from 'react';
import Wrapper from '../../../hoc/Wrapper';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
    return (
      <li key={ingKey}>
        <span style={{textTransfrom: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
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
      <p>Continue to Checkout?</p>
    </Wrapper>
  );
}

export default orderSummary;
