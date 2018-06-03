import React from 'react'
import classes from './navigationitems.css'
import Navigationitem from './Navigationitem/navigationitem'



const navigationitems =(props)=>{ 

    return(
    <ul className={classes.Navigation} >
        <Navigationitem  exact link='/'  >Burger Builder</Navigationitem>
        {props.logout?
        <Navigationitem  link='/orders'  >Orders</Navigationitem>:null}
        {!props.logout ?
        <Navigationitem  link='/signup'  >SignUp</Navigationitem>:
        <Navigationitem  link='/logout'  >Logout</Navigationitem>   
    }
        
    
    </ul>
)};

export default navigationitems;