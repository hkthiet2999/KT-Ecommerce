import React, { Component } from 'react';
import swal from 'sweetalert';
import { Box, Button, TextField, Link, Grid, Card ,makeStyles } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
// import { spacing } from '@material-ui/system';
import { borders } from '@material-ui/system';
// import Card from '@material-ui/core/Card';
// import Grid from '@material-ui/core/Grid';
const axios = require('axios');
// 

// import { makeStyles } from '@material-ui/core/styles';
// // import Input from '@material-ui/core/Input';
// // import InputLabel from '@material-ui/core/InputLabel';
// // import InputAdornment from '@material-ui/core/InputAdornment';
// // import FormControl from '@material-ui/core/FormControl';
// // import TextField from '@material-ui/core/TextField';
// // import Grid from '@material-ui/core/Grid';
// import AccountCircle from '@material-ui/icons/AccountCircle';
//
// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname:'',
      email: '',
      password: '',
      confirm_password: ''
    };
    
  }
  

  
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:8080/accounts/register', {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/accounts/login');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <Grid container justify = "center">
      <Card variant="outlined" style={{ backgroundColor: '#dacfed' ,marginTop: '50px', justifyContent:'center', width: '40%' }}>
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          
          <div>
            <h2>Đăng ký tài khoản</h2>
          </div>

          <div>  
              <AccountCircle />
              <br />
              <TextField 
              id="input-with-icon-grid" 
              label="Họ và tên" 
              type="text"
              autoComplete="off"
              name="fullname"
              value={this.state.fullname}
              onChange={this.onChange}
              required
              />

            <br/><br/>

                <AccountCircle />
                <br />
                <TextField 
                id="input-with-icon-grid" 
                label="Email" 
                type="text"
                autoComplete="off"
                name="email"
                value={this.state.email}
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
              // placeholder="Password"
              required
            />
            <br /><br />
            <LockIcon></LockIcon>
            <br />
            <TextField
              id="input-with-icon-grid"
              label="Xác nhận mật khẩu"
              type="password"
              autoComplete="off"
              name="confirm_password"
              value={this.state.confirm_password}
              onChange={this.onChange}
              // placeholder="Confirm Password"
              required
            />    
            <br /><br />
            <br />
            <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={this.state.username == '' && this.state.password == ''}
              onClick={this.register}
            >
            
              Đăng ký
            </Button> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/accounts/login">
              Đăng nhập
            </Link>

          </div>        
       </div>
     </Card>
    </Grid>
    )
  }
}

