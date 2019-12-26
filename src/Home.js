import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { requestUserData } from "./actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.requestUserData();
console.log(this.props.requestUserData())
      console.log(this.props)

  }

  render() {
    const { results = [] } = this.props.userData
    return (
      results.length
      ? <h1>
          {results.first}
        </h1>
      : <h1>loading...</h1>;
    );
  }
}

const mapStateToProps = state => ({ userdata: state.userdata });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);