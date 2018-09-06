import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-hamburger-app.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(error => {
        this.setState({ error: true });
      })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey];
    }).reduce((sum, el) => {
      return sum + el;
    },0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ 
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ 
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // console.log('You continue purchasing');
    // this.setState({ loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Kevin Fallas',
    //     address: {
    //       street: 'Escobal',
    //       zipcode: '1425',
    //       country: 'Costa Rica'
    //     },
    //     email: 'test@test.com'        
    //   },
    //   deliveryMethod: 'Fast'
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ loading: false, purchasing: false});
    //   });
    const queryParams = [];

    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;    
    let burger = this.state.error ? 
      <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.state.ingredients} />       
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Wrapper>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />;
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Wrapper>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >          
          {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);