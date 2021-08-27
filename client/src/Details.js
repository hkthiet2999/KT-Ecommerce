import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions,
  DialogTitle, DialogContent, InputLabel, OutlinedInput, InputAdornment,Grid, Card, AppBar,
  CardActions, CardContent, CardMedia, CssBaseline,
  Toolbar, Typography, Container, Link, Box, FormControl, Input, CardHeader, Divider
} from '@material-ui/core';
//
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';

//
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';

import { Pagination } from '@material-ui/lab';
import { withStyles } from "@material-ui/core/styles";
import swal from 'sweetalert';
const axios = require('axios');
//
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' - '}
      <Link color="inherit" href="https://github.com/smoothkt4951/">
      Bản quyền thuộc Công Ty TNHH KT.vn
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
  detail_discount: {
    ...theme.typography.button,
    backgroundColor: theme.palette.error.dark,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginBottom: theme.spacing(3),
    border: "1px solid black",
  },
});
// const classes = useStyles();
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      products: [],
      pages: 0,
      loading: false,
      anchorEl: false,
      detail_id: '',
      detail_name:'',
      detail_desc: '',
      detail_price: '',
      detail_discount: '',
      detail_image: '',
      sold: 0,
    };
  }
  // ``````funtions
  sell = () =>{
    this.props.history.push('/list-products');
  }
  // user profile
  userProfile = () => {
    this.props.history.push('/profile');
  }
  homePage = () => {
    this.props.history.push('/home');
  }
  //
  details = (id) => {
    console.log('id product delete:', id)
    axios.post('http://localhost:8080/products/detail-product', {
    id: id
    }, {
    headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
    }
    }).then((res) => {
    console.log(res)
    // productDetail
    // console.log(res.data.productDetail)
    localStorage.setItem('detail_id', res.data.productDetail._id);
    this.props.history.push({
        pathname: '/detail',
        // search: '?query=' + res.data.productDetail._id
    });
    }).catch((err) => {
    swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
    });
    });
}
  // click dropdown
  handleClick = (event) => {
    this.setState({ anchorEl: true })
    
  };

  handleClose = () => {
    this.setState({ anchorEl: false })
  };

  // get token
  componentDidMount = () => {
    let token = localStorage.getItem('token');
    let detail_id = localStorage.getItem('detail_id');

    if (!token) {
      this.props.history.push('/accounts/login');
    } else {
      this.setState({ 
        token: token,
        detail_id: detail_id,
     }, async () => {
        this.getAllProduct();
        await this.detail(this.state.detail_id);    
      });
    }
  }
  // details product
  detail = (id) => {
    console.log('id product delete:', id)
    axios.post('http://localhost:8080/products/detail-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {
        // productDetail
        //   console.log(res.data.productDetail)
        const rnd_sold = Math.floor(Math.random() * 20) // max = 20, min = 0
        this.setState({ detail_name : res.data.productDetail.name, detail_price: res.data.productDetail.price,
            detail_desc: res.data.productDetail.desc, detail_discount: res.data.productDetail.discount, detail_image: res.data.productDetail.image,
            sold : this.state.sold + rnd_sold
        })
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }
  //
  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getAllProduct();
    });
  }


  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }
  // onChange
  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getAllProduct();
      });
    }
  };

  // get
  getAllProduct = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:8080/products/getAll-product${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, products: res.data.products, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, products: [], pages: 0 },()=>{});
    });
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
                KT E-commerce - Kênh mua hàng chuyên nghiệp
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
                  <AssignmentIndIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Hồ sơ người dùng" onClick={this.userProfile}/>
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

        <div className={classes.heroContent}>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}> 
                        <Card>
                            <CardContent style={{ 
                                backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                height: '400px'
                            }}>
                            </CardContent>
                            <CardActions>
                                <Button
                                color="primary"
                                fullWidth
                                variant="text"
                                >
                                {`${this.state.detail_price}`} VND
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid  item lg={8} md={6} xs={12}> 
                    <Card>
                      <CardHeader
                        subheader={`${this.state.detail_name}`}
                        title="Chi tiết sản phẩm"
                      />
                      <Divider />
                      <CardContent>
                        <Grid 
                        container
                        spacing={3}> 
                            <Grid item lg={12} md={12} xs={24}>
                                <Typography variant="h2" gutterBottom align="center" >
                                    {`${this.state.detail_name}`}
                                </Typography>
                            </Grid>
                            
                        </Grid>

                        <Grid
                          container
                          spacing={3}
                        >
                            <Grid item lg={4} md={4} xs={12}>
                                <Typography variant="h3" gutterBottom >
                                {`${this.state.detail_price}`} VND
                                </Typography>
                                <br></br>
                                <div className={classes.detail_discount}>Giảm {`${this.state.detail_discount}`}%</div>
                            </Grid>
                            <Grid  item lg={8} md={8} xs={12}>

                                <Typography variant="subtitle1" gutterBottom align="left">
                                {`${this.state.detail_desc}`}
                                </Typography>
                            </Grid> 
                        </Grid>
                        <Grid container
                          spacing={2}>
                            <Typography variant="h6" gutterBottom>Đã bán: {`${this.state.sold}`}</Typography>
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
                          Mua ngay
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button 
                          className={classes.button}
                          size="large" 
                          variant="contained" 
                          color="primary" 
                          >
                          Thêm vào giỏ hàng
                        </Button>
                        </Box>
                    </Card>
                    </Grid>
                    
                </Grid> 
            </Container>
        </div>

        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Các sản phẩm khác liên quan
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={4} justify="center">
                <Grid item>
                  <TextField
                    
                    variant="outlined"
                    id="outlined-basic"
                    type="search"
                    autoComplete="off"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                    label="Tìm sản phẩm"
                    InputProps={{
                      className: classes.input
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  ></TextField>

                  
                </Grid>
                <Grid item>
                  <Button 
                      className={classes.button}
                      size="large" 
                      variant="contained" 
                      color="primary" 
                      onClick={this.sell}
                      >
                      Kênh Bán hàng
                    </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
         {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
         
          <Grid container spacing={4}>
          
            {this.state.products.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card} onClick={(e) => this.details(card._id)}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image="https://source.unsplash.com/random"
                    // image="`https://localhost:3000/${card.image}`"
                    image= {require(`../uploads/${card.image}`)}
                    title="Chi tiết sản phẩm"
                    
                  />
                  <CardContent className={classes.cardContent}>
                    <Grid container spacing={1}>
                      <Box display='flex' flexGrow={1}>
                        <Typography gutterBottom variant="h4">
                        {'₫'}
                        {card.price}
                          
                        </Typography>
                      </Box>
                      <Typography align='right' variant="caption" display="block" gutterBottom color="error" marginLeft="auto">
                        {'Khuyến mãi: '}
                        {card.discount}{'%'}
                      </Typography>           
                    </Grid>
                             
                    <Typography align='left' className={classes.title}>
                      {card.name}
                    </Typography>
                    <Typography align='left' className={classes.pos} color="textSecondary">
                    {card.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className="button_style"
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={(e) => this.details(card._id)}
                      >
                      Chi tiết sản phẩm
                    </Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Container>

        <div className={classes.heroContent}>
        <Container maxWidth="lg">
            <Pagination  count={this.state.pages} page={this.state.page} onChange={this.pageChange} variant="outlined" shape="rounded" />
          </Container>
        </div>
          


        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          KT E-commerce
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Tầng 10 Capital Building, số 67, Lê Lợi, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
   
    );
  }
}

export default withStyles(useStyles)(Details)