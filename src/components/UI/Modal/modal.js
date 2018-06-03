import React from 'react'
import classes from './modal.css'
import Backdrop from '../Backdrop/backdrop'
import Aux from '../../../hoc/aux'

const modal=(props)=>{
    return(
        <Aux>
            <Backdrop  show={props.show} clicked={props.cancel} />
            <div className={classes.Modal} style={{
                transform:props.show ? 'translateY(0)' :'translateY(-100vh)',
                opacity:props.show ? '1':'0'
            }}>
                {props.children}
            </div>
        </Aux>
    )};


export default modal;