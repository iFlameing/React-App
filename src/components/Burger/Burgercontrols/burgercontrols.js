import React from 'react'
import classes from './burgercontrols.css'
import BurgerControl from './Burgercontrol/burgercontrol'

const controls=[
    {label:'Salad',type:"salad"},
    {label:'Cheese',type:"cheese"},
    {label:'Meat',type:"meat"},
    {label:'Bacon',type:"bacon"}
]


const burgercontrols = (props)=>{
    return(
        <div className={classes.BuildControls}>
        <h1> Price of Burger ${props.price}</h1>        
        {controls.map(ctrl => (
            <BurgerControl key={ctrl.label} label={ctrl.label} ingredientsadded={()=>props.ingredientsadded(ctrl.type)} 
            ingredientsremoved={()=>props.ingredientsremoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        ))}

        <button className={classes.OrderButton} disabled={!props.purchasable}
         onClick={props.ordered} >{props.auth?"ORDER NOW":"Sign Up For Order"}</button>

        </div>
    )
}

export default burgercontrols;