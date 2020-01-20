import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Weather from './Weather';
import Moment from 'moment';

class Detail extends Component {


  constructor(props) {
    Moment.locale('en');
    super(props);

    this.state = {
      result:[],
      city: "",
      noResult: false,
      keyword: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  handleChange(event){
    let { name, value } = event.target;
    this.setState( { [name]:value } );
  }


  componentDidMount() {

    const { match: { params } } = this.props;

    Axios(`http://localhost:2000/api.php?command=location&woeid=${params.woeid}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.data.consolidated_weather.length > 0){

        this.setState({ city: response.data.title});
        this.setState({ result: response.data.consolidated_weather});

      }else{
        this.setState({ noResult: true });
      }


    });

  }

  formatDate(MyDate) {

    var MyDateString;

    MyDateString = MyDate.getFullYear() + '-'
    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
    + ('0' + MyDate.getDate()).slice(-2);

    return MyDateString;
  }

  getResult(){
    return this.state.result.map(item => {
      return (
        <div className="card mb-4 shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">{Moment(item.applicable_date).format('dddd')}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title"><img width="50" src={'/icons/'+ item.weather_state_abbr +'.svg'}/></h1>
            <h1 className="card-title pricing-card-title">{Math.round(item.the_temp)}°C</h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Min: {Math.round(item.min_temp)}°C</li>
              <li>Max: {Math.round(item.max_temp)}°C</li>
            </ul>
          </div>
        </div>
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
          <h1 className="display-4">{this.state.city}</h1>
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



export default Detail;
