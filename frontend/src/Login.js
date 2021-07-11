import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link, Grid, Card, Box } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const axios = require('axios');

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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Google
  responseGoogle = async (res) => {
    console.log(res)
    const awaitRes = await axios.post('http://localhost:8080/accounts/google-login',{
      email: res.ct.Mt,
      fullname: res.ct.Ue,
      user_id: res.googleId,
      token: res.tokenId
    }).then((res) => {
      console.log('user_id in storage:',  res.data.id)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      // localStorage.setItem('user_name', res.data.);
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
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
  // Facebook
  responseFacebook = async (res) => {
    console.log(res)
    const awaitRes = await axios.post('http://localhost:8080/accounts/facebook-login',{
      email: res.email ? res.email : res.id,
      fullname: res.name,
      user_id: res.userID,
      token: res.accessToken
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      // localStorage.setItem('user_name', res.data.);
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/home');
    }).catch((err) => {
      //
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  login = () => {

    // const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:8080/accounts/login', {
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      // localStorage.setItem('user_name', res.data.);
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
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
      <Grid container justify="center">
      <Card variant="outlined" style={{ backgroundColor: '#F1F1F1' ,marginTop: '50px', justifyContent:'center', width: '40%' }}>
      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <div>
          <h2>Đăng nhập</h2>
        </div>
        <div>
          <div className='inputfield'>
            <Grid container justify="center" spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </div>
          <div className='inputfield'>
            <Grid container justify="center" spacing={1} alignItems="flex-end">
              <Grid item>
              <LockIcon></LockIcon>
              </Grid>
              <Grid item>
              <TextField
                className="input_text"
                id="input-with-icon-grid"
                label="Mật khẩu"
                type="password"
                autoComplete="off"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
              </Grid>
            </Grid>
          </div>
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.email == '' && this.state.password == ''}
            onClick={this.login}
          >
            Đăng nhập
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/accounts/forgot-password">
            Quên mật khẩu
          </Link>
          <br /><br />
          <DividerWithText>Hoặc</DividerWithText>
          <br />
          <div className='inputfield'>
              <Grid container justify="center" spacing={1} alignItems="flex-end">
                <Grid item>
                <div className="social">
                  <GoogleLogin
                    clientId="498160978863-vsfnulg0j0g2v4lolbtkjth0l8dk38mh.apps.googleusercontent.com"
                    buttonText="Đăng nhập với Google"
                    onSuccess={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="btnGoogle"
                  />
                </div>
                </Grid>
                <Grid item>
                  <div className="social">
                    <FacebookLogin
                      appId="420167962427260"
                      autoLoad={false}
                      textButton="&nbsp;&nbsp;&nbsp;&nbsp;Đăng nhập với Facebook"
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      icon="fa-facebook"
                      cssClass="btnFacebook"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          <br></br>
          <div className='inputfield'>
            <Grid container justify="center" spacing={1} alignItems="flex-end">
              <Grid item>
              <Box color="text.disabled"><i>Bạn chưa có tài khoản tại KT Ecommerce?</i></Box>
              </Grid>
              <Grid item>
                <Link href="/accounts/register">
                  Đăng ký ngay
                </Link>
              </Grid>
            </Grid>
          </div>

        </div>
      </div>
    </Card>
  </Grid> 
    );
  }
}
