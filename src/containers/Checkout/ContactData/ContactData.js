import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions'

class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipcode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'zip'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: ' Your email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }, 
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest', 
        validation: {},
        valid: true
      },
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let fe in this.state.orderForm) {
      formData[fe] = this.state.orderForm[fe].value;
    }
    
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }  
    
    this.props.onOrderBurger(order, this.props.token);
  }

  checkValid = (value, rules) => {
    let isValid = true;
    if(!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValid(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      console.log(updatedOrderForm[inputId].valid , formIsValid)
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }

    console.log(formIsValid)
    this.setState({ 
      orderForm: updatedOrderForm, 
      formIsValid
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.value}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              shouldValidate={formElement.config.validation}
              invalid={!formElement.config.valid}
            />
          ))
        }
        
        <Button
          btnType="Success" 
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Entry your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
