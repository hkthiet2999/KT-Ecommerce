import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link, Grid, Card } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {

    // const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:3000/', {
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      // localStorage.setItem('token', res.data.token);
      // localStorage.setItem('user_id', res.data.id);
      this.props.history.push('/home');
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      <Grid container justify = "center">
      <Card variant="outlined" style={{ backgroundColor: '#dacfed' ,marginTop: '50px', justifyContent:'center', width: '40%' }}>
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        
      
        <div>
          <h2>Đăng nhập</h2>
        </div>

        <div>
          <AccountCircle />
          <br />
          <TextField
            id="input-with-icon-grid"
            label="Email" 
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.username}
            onChange={this.onChange}
  
            required
          />
          <br /><br />
          <LockIcon></LockIcon>
          <br />
          <TextField
            id="input-with-icon-grid"
            label="Mật khẩu"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            
            required
          />
          <br /><br />
          <br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.email == '' && this.state.password == ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/register">
            Register
          </Link>
        </div>
      </div>


      </Card>
    </Grid> 
    );
  }
}
