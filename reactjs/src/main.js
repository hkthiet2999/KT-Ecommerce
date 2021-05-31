import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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

const useStyles = makeStyles((theme) => ({
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
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// export default class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//     };
//   }
export default function Album() {
  const classes = useStyles();

  return (
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
            {/* CARD 1*/}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Nhà bán trong nước
                    </Typography>
                    <Typography>
                      Dành cho doanh nghiệp / Hộ kinh doanh tại Việt Nam
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Xem thêm &gt;&gt;&gt;
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            {/* CARD 2*/}
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Gian hàng chính hãng
                    </Typography>
                    <Typography>
                      Dành cho chủ sỡ hữu thương hiệu, Nhà Sản Xuất hoặc Nhà phân phối được ủy quyền
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="/more">
                      Xem thêm &gt;&gt;&gt;
                    </Button>
              
                  </CardActions>
                </Card>
              </Grid>
              {/* card 3*/}

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Nhà bán quốc tế
                    </Typography>
                    <Typography>
                      Dành cho Nhà Bán có kho hàng tại Nước Ngoài
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="/more">
                      Xem thêm &gt;&gt;&gt;
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              {/* card 4*/}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Học viện KT E-commerce
                    </Typography>
                    <Typography>
                      Tài liệu và Video thiết thực đồng hành cùng bạn từ những bước đầu bán hàng
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="/more">
                      Xem thêm &gt;&gt;&gt;
                    </Button>
      
                  </CardActions>
                </Card>
              </Grid>
              
              {/* card 5*/}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Trung tâm hỗ trợ nhà bán hàng
                    </Typography>
                    <Typography>
                      Đội ngũ hỗ trợ nhiệt tình và chu đáo sẵn sàng hỗ trợ bạn
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button size="small" color="primary" href="/more">
                      Xem thêm &gt;&gt;&gt;
                    </Button>
      
                  </CardActions>
                </Card>
              </Grid>

              {/* card 6*/}
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Cộng đồng nhà bán hàng KT E-commerce
                    </Typography>
                    <Typography>
                    Nơi hội tụ những Nhà bán hàng tại KT E-commerce với những chia sẻ và hoạt động hữu ích
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button size="small" color="primary" href="/more">
                      Xem thêm &gt;&gt;&gt;
                    </Button>
      
                  </CardActions>
                </Card>
              </Grid>
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