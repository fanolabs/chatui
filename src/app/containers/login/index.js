import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { actionCreators } from "../../actions";

import "./login.less";


class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onKeypress = this.onKeypress.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onInputChange(e) {
    const { value } = e.target;
    this.setState({
      userId: value
    })
  }

  onKeypress(e) {
    if (e.key === 'Enter') {
      this.onLogin();
    }
  }

  onLogin() {
    const { actions: { login } } = this.props;
    const { userId } = this.state;
    login(userId);
  }

  render() {
    return (
      <div className="login-section">
        <input type="text" 
          placeholder="Enter User ID"
          onChange={this.onInputChange}
          onKeyPress={this.onKeypress}
        />
        <button onClick={this.onLogin}>Login</button>
      </div>
    )
  }

}


const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)


export default Login;