import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Button, TextField,Grid, Card, AppBar,
  CardActions, CardContent, CssBaseline,
  Toolbar, Typography, Container, Link, Box, CardHeader, Divider, Avatar, Dialog, DialogActions,
  DialogTitle, DialogContent
} from '@material-ui/core';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';
// icons
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
//
import swal from 'sweetalert';
const axios = require('axios');
// func
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
        {' - '}
        <Link color="inherit" href="https://github.com/smoothkt4951/">
          Bản quyền của Công Ty Cổ Phần smoothkt4951.vn
        </Link>
        {'.'}
      </Typography>
    );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    style={{marginTop:'50px', marginRight:'10px'}}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const useStyles = theme => ({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',

    height: '100%',
    flexGrow: 2,


  },
  margin: {
    margin: theme.spacing(1),
  },
  box: {
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8
  },
  spreadBox: {
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    height: 40
  },
  button: {
    height: 40
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: "auto"
  },
  cardMedia: {
    
    paddingTop: '56.25%', // 16:9
  },
  title: {
    fontSize: 30,

  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  pos: {
    marginBottom: 12,
  },
});

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        token: '',
        user_id:'',
        openDialog: false,
        id: '',
        username: '',
        email:'',
        avatar:'',
        gender:'',
        birthday:'',
        anchorEl: false,
        confirm_pwdNew: '',
        pwdNew: ''
      };
    }
      // get token + user_id
    componentDidMount = () => {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');
      console.log('user_id trc khi axios: ',user_id)
      if (!token) {
        swal({
          text: 'Người dùng chưa được xác thực hoặc hết hạn xác thực! Hãy đăng nhập lại!',
          icon: "error",
          type: "error"
        });
        this.props.history.push('/accounts/login');
      } else if(!user_id){
        swal({
          text: 'Không tìm thấy thông tin người dùng! Hãy đăng nhập lại!',
          icon: "error",
          type: "error"
        });
        this.props.history.push('/accounts/login');
      }else {
        this.setState({ token: token, user_id: user_id }, () => {
          this.getProfile();
        });
      }
    }
    getProfile = () =>{
      console.log('Get user profile', this.state.user_id)
      axios.get(`http://localhost:8080/accounts/user-info`,
      {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token,
        'user_id': this.state.user_id
      }
    }).then((res) => {
      this.setState({ loading: false, email: res.data.email, username: res.data.fullname, avatar: res.data.avatar});
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false},()=>{});
    });
    }
    //
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    // click dropdown
    handleClick = (event) => {
      this.setState({ anchorEl: true })
      
    };

    handleClose = () => {
      this.setState({ anchorEl: false })
    };
    logOut = () => {
      localStorage.setItem('token', null);
      this.props.history.push('/');
    }

    homePage = () => {
      this.props.history.push('/home');
    }

    // show dialog
    handleResetPwd_openDialog = () =>{
      this.setState({
        openDialog: true,
      })
    }

    handleResetPwd_closeDialog = () => {
      this.setState({ openDialog: false });
    };

    resetPassword = () =>{
      console.log('Ok')
      console.log(this.state.pwdNew)

      if(!this.state.pwdNew || this.state.pwdNew == ''){
        swal({
          text: 'Mật khẩu không được để trống!',
          icon: "error",
          type: "error"
        });
      } else if(this.state.pwdNew.length < 6 ){
        swal({
          text: 'Mật khẩu phải có ít nhất 6 ký tự!',
          icon: "error",
          type: "error"
        });
      }else if(this.state.pwdNew != this.state.confirm_pwdNew){
        swal({
          text: 'Mật khẩu xác nhận không chính xác!',
          icon: "error",
          type: "error"
        });
      }else{
        // let user_id = localStorage.getItem('user_id')
        // const body = new FormData();
        // body.append('email', this.state.email);
        // body.append('password', this.state.pwdNew);

        axios.post('http://localhost:8080/accounts/reset-password', {
          headers: {
            'content-type': 'multipart/form-data',
            'token': this.state.token
          },
          email: this.state.email,
          password: this.state.pwdNew

        }).then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success"
        });
        this.handleResetPwd_closeDialog();
        }).catch((err) => {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error"
          });
          this.handleResetPwd_closeDialog();
        });
      }
    }

    // ````` render
    render() {
      const { classes } = this.props;
      return (
        <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          
          <Toolbar>
            <Box display='flex' flexGrow={1}>
                {/* whatever is on the left side */}
                
                <StorefrontTwoToneIcon className={classes.icon}></StorefrontTwoToneIcon>
  
                <Typography variant="h6" color="inherit" noWrap onClick={this.homePage}>
                  KT E-commerce - Kênh của người bán hàng
                </Typography>
            </Box>
            <div>
            <Button
              style={{ height: 40 }}
              className="button_style"
              variant="contained"
              size="small"
              // onClick={this.logOut}
              onClick={this.handleClick}
            >
            Menu
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Quay về Trang chủ" onClick={this.homePage}/>
              </StyledMenuItem>

              <StyledMenuItem>
                <ListItemIcon>
                  <AssessmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Thống kê Doanh thu" />
              </StyledMenuItem>

              <StyledMenuItem>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" onClick={this.logOut}/>
              </StyledMenuItem>
            </StyledMenu>
          </div>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="lg">
              <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                Hồ sơ người dùng
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Quản lý thông tin hồ sơ của bạn để bảo mật tài khoản
              </Typography>
            
            </Container>          
          </div>
           {/* End hero unit */}
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Card>
              <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Avatar
                    src = {this.state.avatar}
                    style={{width: '200px', height:'200px'}}
                />
              </Box>
              <CardContent style={{alignSelf: 'center'}}>
                <Box 
                sx={{
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                style={{alignSelf: 'center'}}>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h3"
                  >
                    {`${this.state.username}`}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    {/* {`${user.city} ${user.country}`} */}
                    {`${this.state.email}`}
                  </Typography>
                  
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  fullWidth
                  variant="text"
                >
                  Tải lên ảnh đại diện
                </Button>
              </CardActions>
            </Card>
            </Grid>
            
            <Grid item
            lg={8}
            md={6}
            xs={12}>
                <form
                  autoComplete="off"
                  noValidate
                  {...this.props}>
                    <Card>
                      <CardHeader
                        subheader="Bạn có thể cập nhật thông tin cá nhân và mật khẩu tại đây"
                        title="Thông tin cá nhân"
                      />
                      <Divider />
                      <CardContent>
                        <Grid
                          container
                          spacing={3}
                        >
                          <Grid
                            item
                            md={7}
                            xs={14}
                          >
                            <TextField
                              fullWidth
                              // helperText="Please specify the first name"
                              label="Họ và tên"
                              name="fullname"
                              onChange={this.onChange}
                              required
                              // value={this.fake}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={5}
                            xs={10}
                          >
                            <TextField
                              fullWidth
                              // helperText="Please specify the first name"
                              type='number'
                              label="Số điện thoại"
                              name="numberphone"
                              onChange={this.onChange}
                              required
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={12}
                            xs={24}
                          >
                            <TextField
                              fullWidth
                              // helperText="Please specify the first name"
                              label="Địa chỉ"
                              name="address"
                              onChange={this.onChange}
                              required
                              // value={this.fake}
                              variant="outlined"
                            />
                          </Grid>

                          
                          <Grid
                            item
                            md={7}
                            xs={14}
                          >
                            <TextField
                              fullWidth
                              label="Giới tính"
                              name="password"
                              type="string"
                              onChange={this.onChange}
                              required
                              // value={}
                              variant="outlined"
                            />
                          </Grid>


                          <Grid
                            item
                            md={5}
                            xs={10}
                          >
                            <form noValidate>
                              <TextField
                                fullWidth
                                id="date"
                                label="Ngày sinh"
                                type="date"
                                defaultValue="1999-12-30"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={this.onChange}
                                required
                                name="birthday"
                              />
                            </form>

                          </Grid>
                        
                        </Grid>
                      </CardContent>
                      <Divider />
                      <br/>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          p: 2,
                        }}
                        style={{marginBottom:'20px'}}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                        >
                          Cập nhật thông tin
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button 
                          className={classes.button}
                          size="large" 
                          variant="contained" 
                          color="primary" 
                          onClick={this.handleResetPwd_openDialog}
                          >
                          Đổi mật khẩu
                        </Button>
                        {/* Change Password */}
                          <Dialog
                            open={this.state.openDialog}
                            onClose={this.handleResetPwd_closeDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">Đổi mật khẩu</DialogTitle>
                            <DialogContent className={classes.dialog}>
                            <Card style={{ border: "none", boxShadow: "none" }}>
                            <br></br>
                            <Grid container spacing={3}>
                              <Grid
                                item
                                md={6}
                                xs={12}
                              >
                                <TextField
                                  autoComplete="off"
                                  fullWidth
                                  label="Mật khẩu mới"
                                  name="pwdNew"
                                  type="string"
                                  onChange={this.onChange}
                                  required
                                  value={this.state.pwdNew}
                                  variant="outlined"
                                  type="text"
                                  id="outlined-basic" 
                                />
                              </Grid>
                              <Grid
                                item
                                md={6}
                                xs={12}
                              >
                                <TextField
                                  autoComplete="off"
                                  fullWidth
                                  label="Xác nhận mật khẩu mới"
                                  name="confirm_pwdNew"
                                  onChange={this.onChange}
                                  type="string"
                                  required
                                  value={this.state.confirm_pwdNew}
                                  variant="outlined"
                                  type="text"
                                  id="outlined-basic" 
                                />
                              </Grid>
                            </Grid>
                            </Card>
                            </DialogContent>

                            <DialogActions>
                              <Button onClick={this.handleResetPwd_closeDialog} color="primary">
                                Hủy
                              </Button>
                              <Button
                                // disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == '' || this.state.file == null}
                                onClick={(e) => this.resetPassword()} color="primary" autoFocus>
                                Đổi mật khẩu
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* End  Change Password */}
                      </Box>
                    </Card>
                  </form>
            </Grid>
          </Grid>
  
          </Container>

            
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            KT E-commerce
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
     
      );
    }
  }
  
  export default withStyles(useStyles)(Profile)