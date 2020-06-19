import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'},
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'}
];
const disabled = false;
const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Burger price : <strong>{props.finalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
             <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={()=> props.IngredientAdded(ctrl.type)}
                deleted={()=> props.IngredientRemoved(ctrl.type)} 
                disabled={props.disabled[ctrl.type]}
                />
        ))}
        <button className={classes.OrderButton}
                disabled={!props.purchasableSum}
                onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls;