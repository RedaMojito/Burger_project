import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/Images/original.png';
const logo = (props) => (
<div className={classes.Logo}>
    <img src={burgerLogo} alt='MyBurger'/>
</div>
);

export default logo;