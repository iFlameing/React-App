import React,{Component} from 'react'
import Checkoutsummary from '../../components/Order/Checkout/checkoutsummary'
import ContactDetails from './Contactdetails/contactdetail'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Checkout  extends Component{
    state={ 

        loading:false
    }

    // componentDidMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         if(param[0]==='price'){
    //             price=param[1]
    //         }else{
    //             ingredients[param[0]] = +param[1];   
    //         }
    //     }
    //     this.setState({ingredients: ingredients,
    //     totalprice:price});
    // }This is use to extract the query params which is passed to update the 
    //ingredients . Before the use of redux for the management of ingredients and 
    //totalprice state.

    checkoutcancelHandler=()=>{
        this.props.history.goBack()
    }
    checkoutcontinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary =<Redirect to='/'/>
        if(this.props.ingredients){
            const purchased=this.props.purchased?<Redirect to="/" />:null
            summary=(<div>
                {purchased}
                <Checkoutsummary  
                ingredients={this.props.ingredients}
                continue={this.checkoutcontinueHandler}
                cancel={this.checkoutcancelHandler}
                />
                <Route path={this.props.match.path+'/contact-data'}  component={ContactDetails}  />
            </div>)
        }
        return summary
    }
}


const mapStateToProps=state=> ({
    ingredients:state.burgerbuilder.ingredients,
    totalprice:state.burgerbuilder.totalprice,
    purchased:state.order.purchased
})


export default connect(mapStateToProps)(Checkout);