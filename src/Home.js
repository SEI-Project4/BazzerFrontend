import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadUser, setUser } from "./actions/index";

class Home extends Component {

  componentDidMount() {
    this.props.loadUser()
  }

  render() {
    if(this.props.user.firstname){
      const User = this.props.user
      return (
        <div>
        <h1>{User.firstname}</h1>
        </div>
      )
    }
      return (
        <div>
        
        </div>
      )
 
      
  }
}

const mapStateToProps = ({ isLoading, user, error }) => ({
   isLoading,
   user,
   error, 
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
})
  // bindActionCreators({ requestUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);