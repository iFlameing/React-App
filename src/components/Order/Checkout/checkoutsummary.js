import React from 'react'
import Burger from '../../Burger/burger'
import Buttons from '../../UI/Button/button'
import classes from './checkoutsummary.css'

const checkoutsummary=(props)=>(
    <div className={classes.Checkoutsummary} >
        <h1>We hope burger will taste as you like!!!</h1>
        <div style={{width:'100%',margin:'auto'}} >
            <Burger ingredients={props.ingredients} />
        </div>
        <Buttons btntypes='Success' clicked={props.continue} >CONTINUE</Buttons>
        <Buttons btntypes='Danger'  clicked={props.cancel} >CANCEL</Buttons>

    </div>
);

export default checkoutsummary;