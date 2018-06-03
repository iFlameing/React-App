import React,{Component} from "react"
import {  Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../../../store/action/index'

class logout extends Component{
    componentDidMount(){
        this.props.logout()
    }

    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        logout:()=> dispatch(action.logout())
    }
}

export default connect(null,mapDispatchToProps)(logout);