import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import ForgotPwd from './ForgotPwd';
import main from './main';
import Dashboard from './template-MUI/Dashboard';
import sellerMain from './sellerMain';
import listProducts from './listProducts';
import loginSeller from './loginSeller';
import Details from './Details';


import './style.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={main} />
            <Route exact path='/seller' component={sellerMain} />
            <Route exact path='/list-products' component={listProducts} />
            
            <Route exact path='/accounts/login' component={Login} />

            <Route exact path='/accounts/login-for-sell' component={loginSeller} />

            <Route exact path='/accounts/register' component={Register} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/details' component={Details} />

            <Route exact path='/profile' component={Profile} />
            <Route exact path='/accounts/forgot-password' component={ForgotPwd} />
            <Route exact path='/revenue' component={Dashboard} />

            
            {/* <Route component={NotFound}/> */}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);