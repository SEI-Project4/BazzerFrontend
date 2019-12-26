import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestUserData } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestUserData();
    
      console.log(this.props)

  }

  render() {
    
    return (
      <h1>
        {/* {this.props.userData} */}
      </h1>
    );
  }
}

const mapStateToProps = state => ({ userdata: state.userdata });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);