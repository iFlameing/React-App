import React from 'react'
import classes from './burgercontrol.css'

const burgercontrol = (props)=>{


    return(
    <div className={classes.BuildControl}>
        <label className={classes.Label}>{props.label}</label>
        <div>
        <button onClick={props.ingredientsremoved} className={classes.Less} disabled={props.disabled} >Less</button>
        <button onClick={props.ingredientsadded} className={classes.More}  >More</button>
        </div>
    </div>
    )
}

export default burgercontrol;