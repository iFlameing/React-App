import React from 'react'
import classes from './order.css'

const Order =(props)=>{

     const ingredients =[];
     for(let ingredientsName in props.ingredients){
         ingredients.push({
             name:ingredientsName,
             amount:props.ingredients[ingredientsName]
         })
     }
     const outputingredients=ingredients.map(igkey=>{
         return(
             <span style={{
                 textTransform:'capitalize',
                 display:'inline-block',
                 margin:'0 8px',
                 padding:'5px',
                 border:'1px solid #eee',
                 boxShadow:'0px 1px 3px #ccc'
             }} key={igkey.name+igkey.amount} >{igkey.name}({igkey.amount})</span>
         )
     })


    return(
        <div className={classes.Order} >
            <p>Ingredients=>{outputingredients}</p>
            <p><strong>${props.price}</strong></p>
        </div>
    )
}

export default Order;