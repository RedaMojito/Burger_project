import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../../containers/UI/Button/Button';
const orderSummary = (props) =>{

   const ingredientSummary = Object.keys(props.ingredients)
   .map(igKey => {
       return <li key={igKey}>
           <span style={{textTransform: 'capitalize'}}>{igKey}</span> :  {props.ingredients[igKey]}
           </li> }
   );
   return <Aux>
       <h3>Order Summary</h3>
       <p>Delicious burger with the ingredients</p>
       <ul> {ingredientSummary} </ul>
       <h4>Total price : {props.tPrice.toFixed(2)}</h4>
       <p>Continue to checkout ?</p>
       <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
       <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
   </Aux>
};

export default orderSummary;