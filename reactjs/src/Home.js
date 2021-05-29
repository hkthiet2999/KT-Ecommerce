import React, { Component } from 'react';


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
          <h2>Home</h2>
        </div>
      </div>
    );
  }
}