import React from "react";

import classes from './Input.css';
const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidat && props.touched){
    inputClasses.push(classes.Invalid);
  }
  

  switch (props.elementType) {
    case ("input"):
      inputElement = <input
       className={inputClasses.join(' ')}
       {...props.elementConfig} 
       value={props.value} 
       onChange={props.changed}
        />;
      break;
    case ("select"):
      inputElement = <select
       className={inputClasses.join(' ')}
       value={props.optionValue }  
       onChange={props.changed}
      >
        {props.elementConfig.options.map(op=>(
          <option key={op.optionValue} value={op.optionValue} >{op.displayValue}</option>
        ))}
      </select>
      
      
      
      break;
    default:
      inputElement = <input 
       className={inputClasses.join(' ')}
      {...props.elementConfig}
       value={props.value}
       onChange={props.changed} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
