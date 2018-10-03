import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Footer extends Component {


  render() {
    return (
    <div className="container">
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
              <div className="row">
                <div className="col-12 col-md">
                  <small className="d-block mb-3 text-muted">&copy; WeatApp</small>
                </div>
              </div>
            </footer>
          </div>
    )
  }

}



export default Footer;
