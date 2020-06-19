import React from 'react';
import classes from './Order.css';
const Order = (props) => {

    let ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName,amount: props.ingredients[ingredientName]});
    }

    const ingredientOutput = ingredients.map(ig=>{
    return <span key={ig.name} className={classes.span}> {ig.name} ({ig.amount})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>{parseFloat(props.price).toFixed(2)} DH</strong></p>
        </div>
    );
};

export default Order;