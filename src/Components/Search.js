import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Weather from './Weather';

class Search extends Component {


  constructor(props) {

    super(props);

    this.state = {
      searchResult:[],
      keyword: "",
      noResult: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  componentDidMount() {

    const { match: { params } } = this.props;

    this.setState({ keyword: params.keyword});

    Axios(`http://localhost:2000/api.php?command=search&keyword=${params.keyword}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.data.length > 0){
        this.setState({ searchResult: response.data});
      }else{
        this.setState({ noResult: true });
      }


    });

  }


  handleChange(event){
    let { name, value } = event.target;
    this.setState( { [name]:value } );
  }

  getResult(){
    return this.state.searchResult.map(item => {
      return (
        <Weather key={item.woeid} woeid={item.woeid}/>
      );

    });
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
          <h1 className="display-4">Search Result</h1>
        </div>

        <div className="container">
          <div className="card-deck mb-3 text-center">

            <div style={{display: this.state.noResult ? 'block' : 'none' }}>
              No results were found. Try changing the keyword!
            </div>

            {this.getResult()}

          </div>
        </div>
      </div>
    )
  }

}



export default Search;
