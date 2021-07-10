import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

// function Copyright() {
//     return (
//       <Typography variant="body2" color="textSecondary" align="center">
//         {'Copyright © '}
//         {new Date().getFullYear()}
//         {' - '}
//         <Link color="inherit" href="https://github.com/smoothkt4951/">
//           Bản quyền của Công Ty Cổ Phần smoothkt4951.vn
//         </Link>
//         {'.'}
//       </Typography>
//     );
// }

const useStyles = theme => ({
});

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
      };
    }
    // ````` render
    render() {
      const { classes } = this.props;
      return (
          <h1> User Profile </h1>
      );
    }
  }
  
  export default withStyles(useStyles)(Profile)