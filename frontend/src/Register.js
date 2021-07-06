import React, { Component } from 'react';
import swal from 'sweetalert';
import { Box, Button, TextField, Link, Grid, Card ,makeStyles, Paper } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// import "./LRstyle.css"

const axios = require('axios');
//
const DividerWithText = ({ children }) => {
  const classes = useStyles();
  return (
   <div className={classes.container}>
     <div className={classes.border} />
     <span className={classes.content}>{children}</span>
     <div className={classes.border} />
   </div>
  );
};

const useStyles = makeStyles(theme => ({
  /* ---------- hr ---------------- */
  container: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(10),
    paddingLeft: theme.spacing(10),
  },
  border: {
    borderBottom: "2px solid lightgray",
    width: "100%"
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 500,
    fontSize: 18,
    color: "lightgray"
  },
}));

// Social
const responseGoogle = async (response) => {
  try {
    console.log(response)
  } catch (err) {

  }
}

const responseFacebook = async (response) => {
  try {
    console.log(response)
  } catch (err) {

  }
}

//

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
      confirm_password: this.state.confirm_password
    }).then((res) => {
      swal({
        text: res.data.title,
        // text: 'Success',
        icon: "success",
        type: "success"
      });
      this.props.history.push('/accounts/login');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        // text: "Fail",
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div>
          <Grid container justify = "center">
          <Card variant="outlined" style={{ backgroundColor: '#F1F1F1' ,marginTop: '10px', justifyContent:'center', width: '40%' }}>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              
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
                  disabled={this.state.email == '' && this.state.password == '' && this.state.confirm_password == '' &&  this.state.fullname == ''}
                  onClick={this.register}
                >
                
                  Đăng ký
                </Button> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href="/accounts/login">
                  Đăng nhập
                </Link>
                <br /><br />
                <DividerWithText>Hoặc</DividerWithText>
                <br />
                <div className="social">
                  <GoogleLogin
                    clientId="Your google client id"
                    buttonText="Đăng nhập với Google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                  <br /><br />
                  <FacebookLogin
                    appId="Your facebook app id"
                    autoLoad={false}
                    textButton="Đăng nhập với Facebook"
                    callback={responseFacebook} 
                  />
                </div>
              </div>        
          </div>
        </Card>
        </Grid>
      </div>
    )
  }
}

