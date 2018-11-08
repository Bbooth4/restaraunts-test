import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import '../index.css'

import NotFound from './NotFound';
import Home from './Home';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
