import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Button, TextField,Grid, Card, AppBar,
  CardActions, CardContent, CssBaseline,
  Toolbar, Typography, Container, Link, Box, CardHeader, Divider, Avatar, Dialog, DialogActions,
  DialogTitle, DialogContent
} from '@material-ui/core';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';


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
        token: '',
        openDialog: false,
        id: '',
        name: '',
        email:''
      };
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    // show dialog
    handleResetPwd_openDialog = () =>{
      this.setState({
        openDialog: true,
        id: '',
        name: '',
        desc: '',
        price: '',
        discount: '',
        fileName: ''
      })
    }
    handleResetPwd_closeDialog = () => {
      this.setState({ openDialog: false });
    };
    resetPassword = () =>{
      console.log('Ok')
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
  
                <Typography variant="h6" color="inherit" noWrap>
                  KT E-commerce - Kênh của người bán hàng
                </Typography>
            </Box>
              
              <Button
                style={{ height: 40 }}
                className="button_style"
                variant="contained"
                size="small"
                onClick={this.logOut}
              >
                Đăng xuất
              </Button>
  
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
              <Card {...this.props}>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Avatar
                    src={'https://source.unsplash.com/1600x900/?nature,water'}
                    sx={{
                      height: 400,
                      width: 400
                    }}
                  />
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h3"
                  >
                    Kien Thiet
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    {/* {`${user.city} ${user.country}`} */}
                    Email@gmail.com
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
                            md={8}
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
                            md={4}
                            xs={10}
                          >
                            <TextField
                              fullWidth
                              // helperText="Please specify the first name"
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
                            md={6}
                            xs={12}
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
                            md={6}
                            xs={12}
                          >
                            <TextField
                              fullWidth
                              label="Ngày sinh"
                              name="confirm_password"
                              onChange={this.onChange}
                              type="string"
                              required
                              // value={}
                              variant="outlined"
                            />
                          </Grid>
                        
                        </Grid>
                      </CardContent>
                      <Divider />
                      <br/><br/>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          p: 2
                        }}
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
                            <Grid container spacing={3}>
                              <Grid
                                item
                                md={6}
                                xs={12}
                              >
                                <TextField
                                  fullWidth
                                  label="Mật khẩu mới"
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
                                md={6}
                                xs={12}
                              >
                                <TextField
                                  fullWidth
                                  label="Xác nhận mật khẩu mới"
                                  name="confirm_password"
                                  onChange={this.onChange}
                                  type="string"
                                  required
                                  // value={}
                                  variant="outlined"
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