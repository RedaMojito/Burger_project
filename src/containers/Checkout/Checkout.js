import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    /*initState = () => {
        const queryInit = new URLSearchParams(
            this.props.location.search
        );
        const ingredientsInit = {};
        let priceInit = 0;
        for (let param of queryInit.entries()) {
            if (param[0] === 'price') {
                priceInit = param[1];
            } else {
                ingredientsInit[param[0]] = +param[1];
            }
        }
        return {
            ingredients: ingredientsInit,
            totalPrice: priceInit
        };
    };*/

    
       state={
        ingredients:null,
        totalPrice: 0
       } 
        //state = this.initState();
    
   

        UNSAFE_componentWillMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price= 0;
    for (let param of query.entries()){
        if(param[0] === 'price'){
            price = param[1];
        }else{
            ingredients[param[0]] = +param[1];
        }
        
    }

        this.setState({ingredients: ingredients, totalPrice: price});
        console.log(this.state.ingredients);

        
   
    
}  


checkoutCanceledHandler = () =>{
    this.props.history.goBack();
}
checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
}

    render() {
        return (
            <div>
                <CheckoutSummary 
                checkoutCanceled={this.checkoutCanceledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.state.ingredients}
                />
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props)=>(<ContactData ingredients={this.state.ingredients}
                       price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;