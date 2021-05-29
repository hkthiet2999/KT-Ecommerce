import React, { Component } from 'react';
import { Link} from '@material-ui/core';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
    };
  }


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    return (
      <div>
        <div>
          <h2>Welcome page</h2>
          <Link href="/accounts/register">
            Register
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/accounts/login">
              Đăng nhập
            </Link>
        </div>
      </div>
    );
  }
}