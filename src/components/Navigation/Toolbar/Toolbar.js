import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';
import Menu from '../../../containers/UI/Menu/Menu';
const toolbar = (props) =>(
<header className={classes.Toolbar}>
     <Menu oMenu={props.openMenu} />
     <div className={classes.Logo}>
        <Logo />
     </div>
     <ul className={classes.DesktopOnly}>
        <NavigationItems />
     </ul>
</header>
   
);

export default toolbar;