import React from 'react'
import Aux from '../../../hoc/aux'
import Button from '../../UI/Button/button'

const ordersummary=(props)=>{
    const ingredients=Object.keys(props.ingredients).map((igkey,i)=>{
        return (
            <li key={igkey+i}>
            <span style={{textTransform:'capitalize'}}>
            {igkey}
            </span>
            :
             {props.ingredients[igkey]} </li>
        )
    })
    return(
        <Aux>
            <h3>This is  Ordersummary</h3>
            <p>This is your delecious burger that you want </p>
            <ul>
                {ingredients}

            </ul>
            <p>continue to checkout?</p>
            <h2>${props.price}</h2>
            <Button btntypes="Success" clicked={props.continue} >Continue</Button>
            <Button btntypes="Danger" clicked={props.cancel} >Cancel</Button>



        </Aux>

)}
export default ordersummary;