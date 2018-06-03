import React from 'react'
import classes from './button.css'

const Button = (props)=>(
    <button className={[classes.Button,classes[props.btntypes]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled} >{props.children}</button>
);

export default Button;