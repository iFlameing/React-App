import React,{ Component } from 'react'
import Input from '../../components/UI/Input/input'
import Button from '../../components/UI/Button/button'
import classes from './auth.css'
import { connect } from 'react-redux'
import * as action from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component{

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Email Address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touch:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minlength:6
                },
                valid:false,
                touch:false
            }
        },
        isSignup:true
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
        }
        
        return isValid;

    }

     inputchangeHandelr=(event,controlskey)=>{
         const updatedcontrols={
             ...this.state.controls,
             [controlskey]:{
                 ...this.state.controls[controlskey],
                 value:event.target.value,
                 touch:true,
                 valid:this.checkvalidity(event.target.value,this.state.controls[controlskey].validation)
             }
            
         }
         this.setState({
             controls:updatedcontrols
         })
     }

     submitHandler=(event)=>{
         event.preventDefault()
         const data={
             email:this.state.controls.email.value,
             password:this.state.controls.password.value
         }
         let signup=this.state.isSignup

         this.props.submit(data,signup)
     }

     signupHandler=(event)=>{
         event.preventDefault()
        this.setState(prevState=>({isSignup:!prevState.isSignup}))
     }
    render(){
        let formelement=[];
        for (let key in this.state.controls){
            formelement.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form=<Spinner/>
        if(!this.props.loading){
            form=(
                formelement.map(formelement=>(
                    <Input
                        invalid={formelement.config.valid} 
                        shouldvalidate={formelement.config.validation}
                        touch={formelement.config.touch}
                        changed={(event)=>this.inputchangeHandelr(event,formelement.id)}
                        key={formelement.id}
                        elementType={formelement.config.elementType}
                        elementConfig={formelement.config.elementConfig}
                        value={formelement.config.value} />
                ))
            )
        }

        let error=null;
        if(this.props.fail){
            error=this.props.error
        }
        let redirect=null
        if(this.props.isAuthenticated && !this.props.buildingtheburger ){
            redirect=<Redirect to='/' />
        }

        if(this.props.isAuthenticated && this.props.buildingtheburger){
            
            redirect=<Redirect to='/checkout'/>
        }

        return(
            <div className={classes.Auth} >
                {redirect}
                 {error}
                <form >
                    {form}
                 <Button btntypes='Success'  clicked={this.submitHandler}>SUBMIT</Button> 
                 <Button btntypes='Danger'  clicked={this.signupHandler}>Switch To {this.state.isSignup ? 'SignIn':'SignUp'}</Button> 
                </form>

            </div>
        )
    }
}
const mapStateToProps=state=>({
    error:state.auth.error,
    loading:state.auth.loading,
    fail:state.auth.fail,
    isAuthenticated:state.auth.token!==null,
    buildingtheburger:state.burgerbuilder.building
})

const mapDispatchToProps=dispatch=>({
    submit:(data,isSignup)=>dispatch(action.auth(data,isSignup))
})
export default connect(mapStateToProps,mapDispatchToProps)(Auth);