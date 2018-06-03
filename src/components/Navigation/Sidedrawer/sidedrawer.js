import React from 'react'
import Logo from '../../Logo/logo'
import Navigation from '../Navigationitems/navigationitems'
import classes from './sidedrawer.css'
import Backdrop from '../../UI/Backdrop/backdrop'
import Aux from '../../../hoc/aux'

const sidedrawer =(props)=>{

    let attachedclasses=[classes.Sidedrawer,classes.close]
    if(props.show){
        attachedclasses=[classes.Sidedrawer,classes.open]
    }
    
    return(
    <Aux>  
        <Backdrop show={props.show} clicked={props.backdrop} />  
        <div className={attachedclasses.join(' ')}  onClick={props.backdrop}   >
            <Logo height='15%' ></Logo>    
            <nav  >
                <Navigation logout={props.logout} />    
            </nav>
        </div>
    </Aux>

)};

export default sidedrawer;
