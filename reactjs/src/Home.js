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
const axios = require('axios');
//
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
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
  constructor() {
    super();
    this.state = {
      token: '',
      id: '',
      name: '',
      desc: '',
      price: '',
      discount: '',
      page: 1,
      pages: 0,
      products: [],
    };
  }
  // funtions
  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
    });
  }


  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }
  // render
  render() {
    const { classes } = this.props;
    return (
      // <Grid container justify = "center">
      //   <Card variant="outlined" style={{ backgroundColor: 'ActiveBorder' ,marginTop: '50px', justifyContent:'center', width: '100%', height: '100%' }}>
                
      //     <div>
      //       {this.state.loading && <LinearProgress size={40} />}
      //       <div>
      //         <h2>Trang chủ</h2>
      //         <Button
      //           className="button_style"
      //           variant="contained"
      //           color="primary"
      //           size="small"
      //         >
      //           Thêm sản phẩm
      //         </Button>
      //         <Button
      //           className="button_style"
      //           variant="contained"
      //           size="small"
      //           onClick={this.logOut}
      //         >
      //           Đăng xuất
      //         </Button>
      //       </div>
      //       <br />
            
      //       <TableContainer>
      //         <TextField
      //           id="standard-basic"
      //           type="search"
      //           autoComplete="off"
      //           name="search"
      //           value={this.state.search}
      //           onChange={this.onChange}
      //           placeholder="Tìm kiếm sản phẩm"
      //           required
      //         />
      //         <Table aria-label="simple table">
      //           <TableHead>
      //             <TableRow>
      //               <TableCell align="center">Tên sản phẩm</TableCell>
      //               <TableCell align="center">Hình ảnh</TableCell>
      //               <TableCell align="center">Mô tả</TableCell>
      //               <TableCell align="center">Giá</TableCell>
      //               <TableCell align="center">Mã giảm giá</TableCell>
      //               <TableCell align="center">Tùy chọn</TableCell>
      //             </TableRow>
      //           </TableHead>
      //           <TableBody>
      //             {this.state.products.map((row) => (
      //               <TableRow key={row.name}>
      //                 <TableCell align="center" component="th" scope="row">
      //                   {row.name}
      //                 </TableCell>
      //                 <TableCell align="center"><img src={`http://localhost:2000/${row.image}`} width="70" height="70" /></TableCell>
      //                 <TableCell align="center">{row.desc}</TableCell>
      //                 <TableCell align="center">{row.price}</TableCell>
      //                 <TableCell align="center">{row.discount}</TableCell>
      //                 <TableCell align="center">
      //                   <Button
      //                     className="button_style"
      //                     variant="outlined"
      //                     color="primary"
      //                     size="small"
      //                     onClick={(e) => this.handleProductEditOpen(row)}
      //                   >
      //                     Chỉnh sửa
      //                 </Button>
      //                   <Button
      //                     className="button_style"
      //                     variant="outlined"
      //                     color="secondary"
      //                     size="small"
      //                     onClick={(e) => this.deleteProduct(row._id)}
      //                   >
      //                     Xóa luôn
      //                 </Button>
      //                 </TableCell>
      //               </TableRow>
      //             ))}
      //           </TableBody>
      //         </Table>
      //         <br />
      //         <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
      //       </TableContainer>

      //     </div>
      //   </Card>
      // </Grid>


      <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            KT E-commerce - Kênh của người bán hàng
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Bán hàng chuyên nghiệp
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Quản lý shop của bạn một cách hiệu quả với Kênh người bán của chúng tôi
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="/accounts/login">
                    Đăng nhập
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href="/accounts/register">
                    Đăng ký
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
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
          Footer
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