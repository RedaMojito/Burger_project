import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../containers/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../containers/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    meat: 1,
    bacon: 1,
    cheese: 0.6,
    salad: 0.4
};

class BurgerBuilder extends Component {


    state = {
        ingredients :{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        this._isMounted = true;
        axios
          .get("https://react-my-burger-eeb94.firebaseio.com/ingredients.json")
          .then((response) => {
            this.setState({ ingredients: response.data });
          });
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    sumOfPurchasable = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map((igKey)=>{
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el;
        }
        ,0);
        this.setState({purchasable: sum > 0});
    };
    purchaseHandler = () =>{
        if(this._isMounted){
            this.setState({purchasing: true});
        console.log(this.state.ingredients);
        }
        
    };
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };
    purchaseContinueHandler = () =>{
        //alert('You can Continue ');
       /*  */
            const queryParams = [];
            for(let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            queryParams.push('price=' + this.state.totalPrice);
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname:'/checkout',
                search: '?' + queryString
            });
            console.log(this.props.history);
            console.log('yeah well');

    };
     addIngredientsHandler =  (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.sumOfPurchasable(updatedIngredients);
     };

     removeIngredientsHandler = (type) =>{
         const prevCount = this.state.ingredients[type];
        if(this.state.ingredients[type]<= 0){
            return;
        }
          const nextCount = prevCount - 1;
          const deletedIngredients ={...this.state.ingredients};
          deletedIngredients[type]= nextCount;
          const prevPrice = INGREDIENT_PRICES[type];
          const nextPrice = this.state.totalPrice - prevPrice;
          this.setState({ingredients: deletedIngredients, totalPrice:nextPrice});
          this.sumOfPurchasable(deletedIngredients);
                     };
        

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
       for(let key in disabledInfo){
           disabledInfo[key]= disabledInfo[key] <= 0;
        } 
        //{salad: true, meat:false...}
        let orderSummary= null;
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        let burger= <Spinner/>

        if(this.state.ingredients){
        burger=(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                IngredientAdded={this.addIngredientsHandler}
                IngredientRemoved={this.removeIngredientsHandler}
                disabled={disabledInfo}
                price={this.finalPrice}
                finalPrice={this.state.totalPrice}
                purchasableSum={this.state.purchasable}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
        orderSummary= <OrderSummary 
        tPrice={this.state.totalPrice}
        ingredients={this.state.ingredients} 
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        />;
        }
        if(this.state.loading){
            orderSummary= <Spinner/>;
        }

        return (
            <Aux>
                
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
                        
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);