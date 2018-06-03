import React ,{Component} from 'react';
import Aux from '../../hoc/aux';
import Toolbar from '../Navigation/Toolbar/toolbar'
import classes from './layout.css'
import Sidedrawer from '../Navigation/Sidedrawer/sidedrawer'
import { connect } from 'react-redux'

class Layout  extends Component {

  state={
    show:false
  }

  Sidedrawerbackdrophandler=()=>{
    this.setState({
      show:false
    })

  }

  Sidedrawertoogle=()=>{
    const doesshow=this.state.show;
    this.setState({
      show:!doesshow
    })
  }

  render(){
    return (
      <Aux>
        <Toolbar clicked={this.Sidedrawertoogle} logout={this.props.logout}/>
        <Sidedrawer show={this.state.show} backdrop={this.Sidedrawerbackdrophandler} logout={this.props.logout} />
        <div>Tool box , sidedrawer,backdrop</div>
        <main  className={classes.Content} >
            {this.props.children}
        </main>
      </Aux>
    );   
  }
}
const mapStateToProps=state=>({
  logout:state.auth.token!==null,
})

export default connect(mapStateToProps)(Layout);
