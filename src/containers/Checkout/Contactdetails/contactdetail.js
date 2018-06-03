import React,{Component} from 'react'

import Button from '../../../components/UI/Button/button'
import classes from './contactdetails.css'
import Spinner from '../../../components/UI/Spinner/spinner'
import Input from '../../../components/UI/Input/input'
import {connect} from 'react-redux'
import * as  orderAction from '../../../store/action/index'

class Contactdetails extends Component{
    state={
           orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                pincode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Pincode'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:6,
                        maxlength:6,
                        isNumeric:true
                    },
                    valid:false,
                    touch:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touch:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Email'
                    },
                    value:'',
                    validation:{
                        required:true,
                        isEmail:true
                    },
                    valid:false,
                    touch:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayvalue: 'Fastest'},
                            {value:'cheapest',displayvalue: 'Cheapest'}
                        ]
                        
                    },
                    value:'Fastest',
                    valid:true
                }

            },
            formIsValid:false
        }

        orderHandler=(event)=>{
            event.preventDefault()  
            if(this.state.formIsValid){
                this.setState({loading:true})
                const formdata={}
                for( let key in this.state.orderForm){
                    formdata[key]=this.state.orderForm[key].value
                }
                const order={
                            ingredients:this.props.ingredients,
                            totalprice:this.props.totalprice,
                            customer:formdata,
                            userId:this.props.localId
                        }
                        this.props.purchased(order,this.props.token)
                        // axios.post('/orders.json',order)
                        // .then(response => {this.setState({
                        //     loading:false,        
                        // })
                        // this.props.history.push('/') }
                        // )
                        // .catch(error => {
                        //     this.setState({
                        //         loading:false,
                        //     }) ;
                        //     console.log(error)
                        // } ) This code use in posting the order by simple method 
                        //but now we are using redux so we make this post request using
                        //redux .
            }
            else{
                alert("Please fill the form correctly!!!")
            }
            

            
            
        }

        checkvalidity(value,rules){
            let isValid=true;
            if(rules){
                if(rules.required){
                    isValid=value.trim()!==''&& isValid
                }
                if(rules.minlength){
                    isValid=value.length>=6 && isValid
                }
                if(rules.maxlength){
                    isValid=value.length<=6 && isValid
                }
                if ( rules.isEmail ) {
                    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                    isValid = pattern.test( value ) && isValid
                }
            
                if ( rules.isNumeric ) {
                    const pattern = /^\d+$/;
                    isValid = pattern.test( value ) && isValid
                }
            }
            
            return isValid;

        }

        inputchangeHandelr=(event,inputKey)=>{
            //console.log(inputKey)
            const orderform={
                ...this.state.orderForm
            }
            const updatedformelement={
                ...orderform[inputKey]
            }
            updatedformelement.value=event.target.value;
            updatedformelement.touch=true;
            updatedformelement.valid=this.checkvalidity(updatedformelement.value,updatedformelement.validation)
            orderform[inputKey]=updatedformelement;
            let formIsValid=true;
            for(let key in orderform){
                formIsValid=orderform[key].valid && formIsValid
        
            }
            this.setState({
                orderForm:orderform,
                formIsValid:formIsValid
            })

        }


        render(){
            let formelement=[];
            for (let key in this.state.orderForm){
                formelement.push({
                    id:key,
                    config:this.state.orderForm[key]
                })
            }

            let form=( <form>
                {formelement.map(formelement=>(
                    <Input  
                    invalid={formelement.config.valid} 
                    shouldvalidate={formelement.config.validation}
                    touch={formelement.config.touch}
                    changed={(event)=>this.inputchangeHandelr(event,formelement.id)}
                    key={formelement.id}
                    elementType={formelement.config.elementType}
                    elementConfig={formelement.config.elementConfig}
                     value={formelement.config.value}  />
                ))}
        
                 <Button btntypes='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>)
            if(this.props.loading){
                form=<Spinner/>
            }
            return(
                <div className={classes.Contact} >
                <h4>Enter your contact Details</h4>
                {form}
                </div>
            )
        }

}
const mapStateToProps=state=>({
    ingredients:state.burgerbuilder.ingredients,
    totalprice:state.burgerbuilder.totalprice,
    loading:state.order.loading,
    token:state.auth.token,
    localId:state.auth.localId
})

const mapDispatchToProps=dispatch=>{
    return{
        purchased:(orderData,token)=>dispatch(orderAction.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Contactdetails);