import React,{Component} from "react"
import Order from '../../components/Order/order'
import {connect} from 'react-redux'
import * as action from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/spinner'

class orders extends Component{
    // state={
    //     orders:[],
    //     loading:true
    // } Before redux we manage state in this container.
    componentDidMount(){
        this.props.fetchorders(this.props.token,this.props.localId)
        // axios.get('/orders.json')
        // .then(res=>{
        //     const fetchorders=[];
        //     for(let key in res.data){
        //         fetchorders.push({
        //             ...res.data[key],
        //             id:key
        //         })}

        //         this.setState({
        //             loading:false,
        //             orders:fetchorders
        //         })
            
        // }) This code is used previously  to make the get request from the databasse
        // now as we are using redux we also want that this get request is manage by the 
        //redux.
    }

    render(){
        let order=<Spinner/>
        if(!this.props.loading){
            order=this.props.orders.map(order=>(<Order key={order.id} ingredients={order.ingredients} price={order.totalprice} />))  
        }
        return(
            <div>
                {order}
            </div>
        )
    }

}



const mapStateToProps=state=>({
    orders:state.order.order,
    loading:state.order.loading,
    token:state.auth.token,
    localId:state.auth.localId

})

const mapDispatchToProps=dispatch=>({
    fetchorders:(token,localId)=>dispatch(action.orderretrieve(token,localId))

})
export default connect(mapStateToProps,mapDispatchToProps)(orders);