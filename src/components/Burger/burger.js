import React from 'react'
import classes from './burger.css'
import BurgerIngredient from './BurgerIngredients/burgeringredients'

const  burger= (props)=>{
    
    let  transformedingredient= Object.keys(props.ingredients).map(ig=> {
        return [...Array(props.ingredients[ig])].map((_,i)=>{
            return <BurgerIngredient key={ig+i} type={ig}/>
        })
    })
    .reduce((arr,el)=>{
        return arr.concat(el) 
    },[])
    if(!transformedingredient.length){
        transformedingredient=<p>Please select ingredients</p>
    }
    return(
        <div className={classes.Burger}>
        <BurgerIngredient type="breadtop"/>
        {transformedingredient}
        <BurgerIngredient type="breadbottom "/>

        </div>

    );


};

export default burger;