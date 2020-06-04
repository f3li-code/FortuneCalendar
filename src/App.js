import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import Calendar from './containers/Calendar/Calendar';
import Month from './containers/Calendar/Month/Month';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path='/calendar/:year/:month' component={Month}/>
            <Route path='/calendar' exact component={Calendar}/>
            <Route path='/' exact component={Calendar} />
            
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
