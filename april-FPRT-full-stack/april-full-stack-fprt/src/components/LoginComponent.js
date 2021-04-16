import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './LoginComponent.css';
import axios from 'axios';
import { HashLink } from 'react-router-hash-link';
const burl = "http://localhost:7700/api/auth/login";


class LoginComponent extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      error: '',
      role: '',
      allowLogIn: false
    }
  }
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value })
  }
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }
  componentDidUpdate() {
    if (this.state.email && this.state.password && !this.state.allowLogIn) {
      this.setState({ allowLogIn: true })
    }
    if ((!this.state.email || !this.state.password) && this.state.allowLogIn) {
      this.setState({ allowLogIn: false })
    }
  }
  handleSubmit = () => {

    fetch(burl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((res) => res.json())
      .then((data) => {

        sessionStorage.setItem('email', this.state.email);
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('profilePhoto', data.profile_photo);
        localStorage.setItem('userGhibli', JSON.stringify(data));
        localStorage.setItem("isloggedinGhibli", true);
        this.props.history.push('/home');
      })
      .catch((err) => {
        this.setState({ error: "Invalid Credentials!!!" })
      })
  }

  render() {
    return (

      <div className="welcome_background " style={{marginTop:'40px'}} >
        <div className="container" > <br />
          <div className="row ">
            {/* <div className="col-xs-7 col-sm-6 col-lg-8"><h5>Welcome to Form Creator</h5></div> */}
            <div className="col-xs-5 col-sm-6 col-lg-4">
              <div style={{ textAlign: 'center' }} >
              <h5 style={{ margin: '10px', color: '#000000', display: 'inline-block' }}>Welcome to Form Creator</h5>
                {/* <h5 style={{ margin: '10px', color: '#cccdb4', display: 'inline-block' }}>JWT</h5> */}
                <NavLink to='./LoginComponent'><button className="btn" style={{ margin: '10px', backgroundColor: '#1278a8', color: 'black', display: 'inline-block' }}>LOGIN </button></NavLink>
                <NavLink to='./'><button className="btn " style={{ backgroundColor: '#111', color: 'white', display: 'inline-block' }} > SIGNUP</button></NavLink>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-5 col-sm-6 col-lg-4" style={{ textAlign: 'center' }}>
              <div className="sub-col" >
                <div className="panel panel-danger" style={{
                  backgroundColor: '#1278a8', borderRadius: '2px', padding: '15px', color: 'black', display: 'inline-block'
                }}>
                  <div className="panel-heading">
                    <h5>Login</h5>
                    <hr style={{ backgroundColor: 'black', height: '2px' }}></hr>
                  </div>
                  {/* <h6 style={{color:'red'}}> {this.state.error}</h6> */}
                  <p style={{ color: '#c6461e' }}>{this.state.error}</p>

                  <div className="panel-body">
                    <div className="">
                      <label className="control-label">Email</label>
                      <input type="email" name="order_id" value={this.state.email} className="form-control"
                        onChange={this.handleChangeEmail} required />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Password</label>
                      <input type="password" name="order_id" value={this.state.password} className="form-control"
                        onChange={this.handleChangePassword} required />
                        
                    </div>
                    {
                      this.state.allowLogIn ? <button className="but" onClick={this.handleSubmit}>Login</button> : null
                    }
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }
}

export default LoginComponent;