import React from "react";
import { connect } from "react-redux";

import Login from "../login";
import Chat from "../chat";

import "./app.less";


class AppComponent extends React.Component {

  render() {
    const { user } = this.props;
    const isLogin = !!user.id;
    return (
      <div className="app-container">
        {!isLogin ? <Login /> : <Chat />}
      </div>
    )
  }

}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => ({})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)


export default App;