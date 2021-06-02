import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import main from '../main';


import './style.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={main} />
            <Route exact path='/accounts/login' component={Login} />
            <Route exact path='/accounts/register' component={Register} />
            <Route exact path='/home' component={Home} />

            {/* <Route component={NotFound}/> */}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);