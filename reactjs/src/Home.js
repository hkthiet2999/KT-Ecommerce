import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell,Grid, Card, AppBar,
  CardActions, CardContent, CardMedia, CssBaseline,
  Toolbar, Typography, Container, Link,
} from '@material-ui/core';
import CameraIcon from '@material-ui/icons/PhotoCamera';
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

const useStyles = theme => ({
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
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
      loading: false
    };
  }
  // ``````funtions
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
  // ````` render
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            KT E-commerce - Kênh của người bán hàng
          </Typography>
          <Button
            position = "right"
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
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
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={this.handleAddProduct_openDialog}>
                    Thêm sản phẩm mới
                  </Button>
                </Grid>
                <Grid item>
                  
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
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Tên sản phẩm"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Mô tả sản phẩm"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Giá"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
              placeholder="Khuyến mãi"
              required
            /><br /><br />
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
                placeholder="File"
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
        </div>
         {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
         
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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

export default withStyles(useStyles)(Home)