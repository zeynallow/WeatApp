import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Footer from './Components/Footer';
import Main from './Components/Main';
import Search from './Components/Search';
import NoMatch from './Components/NoMatch';
import Detail from './Components/Detail';

export default class Application extends Component{

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/search/:keyword' component={Search}/>
            <Route exact path='/weather/:woeid' component={Detail}/>
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }

}

if (document.getElementById('root')) {
      ReactDOM.render(<Application />, document.getElementById('root'));
  }

module.hot.accept();
