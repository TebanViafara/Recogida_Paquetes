import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../views/Login';
import Menu from '../views/Menu';
import Create from '../views/Create';
import Edit from '../views/Edit';
import Register from '../views/Register';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/create" component={Create} />
                <Route exact path="/edit/:id" component={Edit} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;