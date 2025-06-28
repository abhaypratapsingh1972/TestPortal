import React from "react";
import { Navigate } from "react-router-dom";
import './login.css';
import { connect } from 'react-redux';
import { loginUser} from '../../../redux/actions/loginAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : ""
    }
  }

  usernameInputHandler = (event)=>{
    this.setState({
      ...this.state,
      username : event.target.value
    });
  }

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password : event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser({username:this.state.username,password:this.state.password});
  }

  render(){
    if(this.props.user.isLoggedIn) {
      return (<Navigate to='/home'/>);
    }
    else {
      return (
        <div className="login-container">
          <div className="login-box fade-in">
            <h2 className='login-box-title'>Admin Login</h2>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <div className="form-field">
                <input 
                  autoComplete="off" 
                  className="form-input" 
                  type="text" 
                  value={this.state.username} 
                  onChange={this.usernameInputHandler} 
                  placeholder="Enter your username"
                  required 
                />
                <label className="form-label">Username</label>
                <span className="form-icon">👤</span>
              </div>
              <div className="form-field">
                <input 
                  autoComplete="off" 
                  className="form-input" 
                  type="password" 
                  value={this.state.password} 
                  onChange={this.passwordInputHandler}
                  placeholder="Enter your password"
                  required
                />
                <label className="form-label">Password</label>
                <span className="form-icon">🔒</span>
              </div>
              <button className="login-button" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user : state.user
});

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);