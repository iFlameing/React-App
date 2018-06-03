import React, {Component} from "react"

import  Aux from "../../hoc/aux"
import Burger from"../../components/Burger/burger"
import BurgerControls from '../../components/Burger/Burgercontrols/burgercontrols'
import Modal from '../../components/UI/Modal/modal'
import Ordersummary from '../../components/Burger/Ordersummary/ordersummary'
import Spinner from '../../components/UI/Spinner/spinner'
import {connect} from 'react-redux'
import * as action from '../../store/action/index' 




class BurgerBuilder extends Component{

    state ={
        purchasing:false,
        loading:false,
        purchased:false
    }

     componentDidMount(){
        this.props.initIngredients()
    //     axios.get('https://my-first-react-app-84542.firebaseio.com/ingredients.json')
    //     .then(response =>{
    //         this.setState({ingredients:response.data})
         }
    // } we are doing this to get the ingredients from the server now we are fetching 
    //the ingredients from the server again but not with this method but with the help of redux and making 
    //async request in redux and update our state of ingredients.

    purchased=()=>{
        if(this.props.isAuthenticated){
            this.setState({
                purchasing:true
            })
        } 
        else{
            this.props.history.push('/signup')
        }

    }
    purchasedcancel=()=>{
        this.setState({
            purchasing:false
        })
    }

    purchasedcontinue=()=>{
        this.props.afterpurchased()
        //const queryParams=[]
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) +'=' + encodeURIComponent(this.state.ingredients[i]))
        // }// This for loop is used to create queryparams for the next page to access to ingredients
        // But due to use of redux we are not continuing this approach . 
        // queryParams.push('price='+this.state.totalprice);
        // let  queryString=queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            //search:'?'+queryString  After the use of redux we are not send querystring
        })
        
        //alert("You are continuing to next step")
        // this.setState({
        //     purchasing:false
        // })
    //    
    }

    purchasable=(ingredients)=>{
        
        const  sum =Object.values(ingredients).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
        
    }

    // addingredientsHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type]
    //     const updatecount=oldCount+1
    //     const updateIngredients={
    //         ...this.state.ingredients
    //     }
    //     updateIngredients[type]=updatecount;
    //     const priceAddition=ingredients_price[type]
    //     const oldprice=this.state.totalprice
    //     const newprice=oldprice+priceAddition
    //     this.setState({
    //         totalprice:newprice,
    //         ingredients:updateIngredients
    //     })
    //     this.purchasable(updateIngredients);

    // } The above of code is used to addingredints before the use of rdeux

    // removeingredientsHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type]
    //     if(!oldCount){
    //         return;
    //     }
    //     const updatecount=oldCount-1
    //     const updateIngredients={
    //         ...this.state.ingredients
    //     }
    //     updateIngredients[type]=updatecount;
    //     const priceAddition=ingredients_price[type]
    //     const oldprice=this.state.totalprice
    //     const newprice=oldprice-priceAddition
    //     this.setState({
    //         totalprice:newprice,
    //         ingredients:updateIngredients
    //     })
    //     this.purchasable(updateIngredients);
        

    // }  The above code is used to remove the ingredients before the use of redux 
    //  
     
    render(){
        const disabledinfo={
            ...this.props.ingredients
        }
        for(let key in disabledinfo){
            disabledinfo[key]=disabledinfo[key]<=0
        }
        let ordersummary=null;        
        let burger=<Spinner/>
        if(this.props.ingredients){
            burger=(
                <Aux>
                    <Burger  ingredients={this.props.ingredients} />
                    <BurgerControls   
                    ingredientsadded={this.props.addingredientsHandler}
                    ingredientsremoved={this.props.removeingredientsHandler}
                    price={this.props.totalprice}
                    purchasable={this.purchasable(this.props.ingredients)}
                    auth={this.props.isAuthenticated}
                    ordered={this.purchased}
                    disabled={disabledinfo}/>
                </Aux>
            )

            ordersummary=<Ordersummary  ingredients={this.props.ingredients} 
            price={this.props.totalprice}
            continue={this.purchasedcontinue}
            cancel={this.purchasedcancel} />
        }

        if(this.state.loading){
            ordersummary=<Spinner/>
        }

    

        return(
            <Aux>
                <Modal show={this.state.purchasing} cancel={this.purchasedcancel} >
                    {ordersummary}
                </Modal>
                {burger}                
            </Aux>
        );
    }
}

const mapStateToProps= (state)=>{
    return {
        ingredients:state.burgerbuilder.ingredients,
        totalprice:state.burgerbuilder.totalprice,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchTpProps=(dispatch)=>{
    return{
        addingredientsHandler:(id)=>dispatch(action.addIngredient(id)),
        removeingredientsHandler:(id)=>dispatch(action.removeIngredient(id)),
        initIngredients:()=>dispatch(action.initIngredients()),
        afterpurchased:()=>dispatch(action.purchasedredirect())
            
        
    }
}

export default connect(mapStateToProps,mapDispatchTpProps)(BurgerBuilder) ;
