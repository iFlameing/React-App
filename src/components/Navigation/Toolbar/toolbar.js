import React from 'react'
import classes from './toolbar.css'
import Logo from '../../Logo/logo'
import Navigation from '../Navigationitems/navigationitems'
import Drawtoogler from '../Sidedrawer/Drawertoogle/Drawertoogle'

const toolbar =(props)=>(
    <header className={classes.Toolbar} >
        <Drawtoogler clicked={props.clicked} />
        <Logo  height='80%' />
        <nav className={classes.Desktop} >
         <Navigation logout={props.logout} />
        </nav>
    </header>

);

export default toolbar;