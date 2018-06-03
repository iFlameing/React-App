import React from 'react'
import classes from './navigationitem.css'
import {NavLink} from 'react-router-dom'
const navigationitem=(props)=>(
    <li className={classes.Navigation} >
        <NavLink 
        to={props.link}
        exact={props.exact}
        >{props.children}
         </NavLink>

    </li>
);

export default navigationitem;