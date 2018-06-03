import React from 'react'
import classes from './input.css'

const input =(props)=>{
    let inputelements=null;
    let inputclasses=[classes.InputElement]
    if(props.touch&&!props.invalid && props.shouldvalidate){
        inputclasses=[classes.InputElement,classes.Invalid]
    }
    switch(props.elementType){
        case('input'):
            inputelements=<input className={inputclasses.join(' ')} {...props.elementConfig}
             value={props.value} onChange={props.changed} />
            break;
        case('textarea'):
            inputelements=<textarea className={inputclasses.join(' ')} {...props.elementConfig}
             value={props.value} onChange={props.changed}/>
            break;
        case('select'):
            inputelements=(<select className={inputclasses.join(' ')} 
            value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option=>(
                    <option  key={option.value} value={option.value} >{option.displayvalue}  </option>
                ))}

            </select>)
            break;
        default:
            inputelements=<input className={inputclasses.join(' ')} {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>
            break;
           
    }

    return(
        <div>
            <label className={classes.Label}> {props.label}</label>
            {inputelements}
        </div>
    )
}
export default input;