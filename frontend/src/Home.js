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
// const classes = useStyles();
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      openProductModal: false,
      openProductEditModal: false,
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
  revenue = () =>{
    this.props.history.push('/revenue');
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
        this.getProduct();
      });
    }
  }
  //
  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
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
        this.getProduct();
      });
    }
  };
  
  // add
  handleAddProduct_openDialog = () =>{
    this.setState({
      openProductModal: true,
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      fileName: ''
    })
  }
  handleAddProduct_closeDialog = () => {
    this.setState({ openProductModal: false });
  };
  addProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('discount', this.state.discount);
    file.append('price', this.state.price);

    axios.post('http://localhost:8080/products/add-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleAddProduct_closeDialog();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null, page: 1 }, () => {
        this.getProduct();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleAddProduct_closeDialog();
    });

  }
  // get
  getProduct = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:8080/products/get-product${data}`, {
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
  // update
  updateProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
    file.append('discount', this.state.discount);
    file.append('price', this.state.price);

    axios.post('http://localhost:8080/products/update-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleUpdateProduct_closeDialog();
      this.setState({ name: '', desc: '', discount: '', price: '', file: null }, () => {
        this.getProduct();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleUpdateProduct_closeDialog();
    });

  }
  handleUpdateProduct_openDialog = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
      price: data.price,
      discount: data.discount,
      fileName: data.image
    });
  };

  handleUpdateProduct_closeDialog = () => {
    this.setState({ openProductEditModal: false });
  };
  // delete
  deleteProduct = (id) => {
    axios.post('http://localhost:8080/products/delete-product', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
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
                  <AssessmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Thống kê Doanh thu" onClick={this.revenue}/>
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
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
              Danh sách sản phẩm
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Quản lý shop của bạn một cách hiệu quả với Kênh người bán của chúng tôi
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
                      onClick={this.handleAddProduct_openDialog}
                      >
                      Thêm sản phẩm mới
                    </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        {/* Add Product */}
        <Dialog
          open={this.state.openProductModal}
          onClose={this.handleAddProduct_closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Thông tin về sản phẩm mới</DialogTitle>
          <DialogContent className={classes.dialog}>
            <TextField
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              label="Tên sản phẩm"
              required
              id="outlined-basic" 
              variant="outlined"
            /><br /><br /><br />
            <TextField
              id="outlined-multiline-static"
              label="Mô tả sản phẩm"
              multiline
              rows={4}
              variant="outlined"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              required
            /><br /><br /><br />
            {/* /> */}
            

            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Giá</InputLabel>
              <OutlinedInput
                  type="number"
                  required
                  autoComplete="off"
                  name="price"

                  id="outlined-adornment-amount"
                  value={this.state.price}
                  onChange={this.onChange}
                  startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                  labelWidth={60}
              />
            </FormControl>

            {/* /> */}
            <br /><br /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
              label="Khuyến mãi (%)"
              required
            /><br /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Tải lên ảnh của sản phẩm
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                // inputProps={{
                //   accept: "image/*"
                // }}
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                label="File"
                hidden
                required
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleAddProduct_closeDialog} color="primary">
              Hủy
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == '' || this.state.file == null}
              onClick={(e) => this.addProduct()} color="primary" autoFocus>
              Thêm
            </Button>
          </DialogActions>
        </Dialog>
        {/* End Add Product */}
        
        
        {/* Edit Product */}
          <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleUpdateProduct_closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Cập nhật</DialogTitle>
            <DialogContent className={classes.dialog}>
            <TextField
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              label="Tên sản phẩm"
              required
              id="outlined-basic" 
              variant="outlined"
            /><br /><br /><br />
            <TextField
              id="outlined-multiline-static"
              label="Mô tả sản phẩm"
              multiline
              rows={4}
              variant="outlined"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              required
            /><br /><br /><br />
            {/* /> */}
            

            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Giá</InputLabel>
              <OutlinedInput
                  type="number"
                  required
                  autoComplete="off"
                  name="price"

                  id="outlined-adornment-amount"
                  value={this.state.price}
                  onChange={this.onChange}
                  startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                  labelWidth={60}
              />
            </FormControl>

            {/* /> */}
            <br /><br /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
              label="Khuyến mãi (%)"
              required
            /><br /><br /><br />
            <Button
              variant="contained"
              component="label"
            > Tải lên ảnh của sản phẩm
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                // inputProps={{
                //   accept: "image/*"
                // }}
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                label="File"
                hidden
                required
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>


          <DialogActions>
            <Button onClick={this.handleUpdateProduct_closeDialog} color="primary">
              Hủy
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == '' || this.state.discount == '' || this.state.price == ''}
              onClick={(e) => this.updateProduct()} color="primary" autoFocus>
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
        {/* End Update Dialog */}

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
                        {/* whatever is on the left side */}
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
                      onClick={(e) => this.handleUpdateProduct_openDialog(card)}
                      >
                      Cập nhật
                    </Button>
                    <Button className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteProduct(card._id)}
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
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
   
    );
  }
}

export default withStyles(useStyles)(Home)