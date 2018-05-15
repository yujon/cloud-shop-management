import React from 'react';
import { Provider,connect } from 'react-redux';
import configureStore from './store/configure-store';
import {Router,Switch, Route, Redirect } from 'react-router-dom';

import LoginIn from './containers/LoginIn';
import Admin from './containers/Admin';

import {history} from './history';

// 创建store
const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <Router history={history}>
	    <div className="app-wrap">
	     	<Route exact path='/' component={LoginIn}></Route>  
	        <Route exact path='/web-loginIn' component={LoginIn}></Route>  
	        <Route path='/web-admin' component={Admin}></Route>  
	    </div>
	</Router>
  </Provider>
);

export default App;
