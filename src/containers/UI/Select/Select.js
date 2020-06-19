import React from 'react';

import classes from '../Input/Input.css';

const Select = (props) => {
    

    return (
        <div className={classes.Input}>
            <select className={classes.InputElement}>
             {props.optionList.map(op=>(
                 <option opValue={op.optionValue}>{op.displayValue}</option>
             ))}
            </select>
        </div>
    );
};

export default Select;