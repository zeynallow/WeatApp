import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Weather from './Weather';

class Main extends Component {


  constructor(props) {

    super(props);

    this.state = {
        keyword: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }



    handleChange(event){
      let { name, value } = event.target;
      this.setState( { [name]:value } );
    }


  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal"><a href="/">WeatApp</a></h5>
          <div className="search">
            <div className="row">
              <div className="col-md-8">
                <input type="text" onChange={ this.handleChange } name="keyword" value={this.state.keyword} className="form-control" placeholder="Enter keyword"/>
              </div>
              <div className="col-md-4">
                <a href={'/search/'+ this.state.keyword} className="btn btn-outline-primary" >Search</a>
              </div>
            </div>

          </div>

        </div>

        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Welcome</h1>
          <p className="lead">What is the weather today?</p>
        </div>

        <div className="container">
          <div className="card-deck mb-3 text-center">

            <Weather woeid="2344116"/>
            <Weather woeid="638242"/>
            <Weather woeid="44418"/>
            <Weather woeid="565346"/>
            <Weather woeid="560743"/>
            <Weather woeid="9807"/>

          </div>
        </div>
      </div>
      )
    }

  }



  export default Main;
