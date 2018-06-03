import React, { Component } from 'react';
import Layout from './components/Layout/layout';
import BurgerBuilder from "./containers/BurgerBuilder/burgerbuilder"
import {Route,withRouter,Switch,Redirect} from 'react-router-dom'
import Logout from './containers/Auth/Logout/logout'
import { connect } from 'react-redux'
import * as action from './store/action/index'
import asyncComponent from './hoc/AsyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/MYorders/order');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/auth');
});

class App extends Component {

  componentDidMount(){
    this.props.autoLogin()
  }
  render() {
    let routes=(
      <Switch>
          <Route   path='/' exact   component={ BurgerBuilder} />
          <Route   path='/signup'    component={asyncAuth} />                            
          <Redirect to='/'/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route   path='/signup'    component={asyncAuth} />                            
         <Route   path='/checkout'  component={ asyncCheckout} />
        <Route   path='/orders'    component={asyncOrders} />         
        <Route   path='/logout'    component={Logout} />  
        <Route   path='/' exact   component={ BurgerBuilder} />  
        </Switch>

      )
    }
    return (     
        <Layout>
          {routes}
        </Layout>
    );
  }
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.token!==null
})
const mapDispatchToProps=dispatch=>{
  return{
    autoLogin:()=> dispatch(action.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
