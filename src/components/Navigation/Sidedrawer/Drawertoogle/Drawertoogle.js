import React from 'react'
import classes from './drawertoogle.css'

const drawtoogler=(props)=>(
    <div onClick={props.clicked}  className={classes.DrawerToggle } >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawtoogler;