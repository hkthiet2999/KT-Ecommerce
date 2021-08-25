import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions,
  DialogTitle, DialogContent, InputLabel, OutlinedInput, InputAdornment,Grid, Card, AppBar,
  CardActions, CardContent, CardMedia, CssBaseline,
  Toolbar, Typography, Container, Link, Box, FormControl, Input
} from '@material-ui/core';
//
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
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
});
// const classes = useStyles();
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      openProductModal: false,
      openProductEditModal: false,
      openProductDeleteModal: false,
      cardID: '',
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
    if (!token) {
      this.props.history.push('/accounts/login');
    } else {
      this.setState({ token: token }, () => {
        this.getAllProduct();
      });
    }
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
              {/* <StyledMenuItem>
                <ListItemIcon>
                  <AssessmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Thống kê Doanh thu" onClick={this.revenue}/>
              </StyledMenuItem> */}

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
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
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
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    // image="https://source.unsplash.com/random"
                    // image="`https://localhost:3000/${card.image}`"
                    image= {require(`../uploads/${card.image}`)}
                    title="Contemplative Reptile"
                    
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
                      color="primary"
                      size="small"
                      // onClick={(e) => this.handleUpdateProduct_openDialog(card)}
                      >
                      Cập nhật
                    </Button>
                    <Button className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      // onClick={(e) => this.deleteProduct(card._id)}
                      // onClick={(e) => this.handleDeleteProduct_openDialog(card._id)}
                      >
                      Xóa
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

export default withStyles(useStyles)(Home)