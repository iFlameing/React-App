import React,{Component} from 'react'
import classes from './burgeringredients.css'
import PropTypes from 'prop-types'

class  BurgerIngredients extends Component{
    render(){
        let ingredient=null
        
        
        switch(this.props.type){
            case ('breadbottom '):
                ingredient=<div className={classes.BreadBottom}></div>
                break;
            case ('breadtop'):
                ingredient=(
                    <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>)
                break;
            case('meat'):
                ingredient=<div className={classes.Meat}></div>
                break;
            case ('cheese'):
                ingredient=<div className={classes.Cheese}></div>
                break;
            case ('salad'):
                ingredient=<div className={classes.Salad}></div>
                break;
            case ('bacon'):
                ingredient=<div className={classes.Bacon }></div>
                break;
            default:
                ingredient=null;
            
        }
        return ingredient;
    }
}

BurgerIngredients.propTypes={
    type:PropTypes.string.isRequired
 
};


export default BurgerIngredients;