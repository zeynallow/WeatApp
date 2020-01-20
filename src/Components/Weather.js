import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

class Weather extends Component {


  constructor(props) {

    super(props);

    this.state = {
      consolidated_weather:[],
      city: "",
      icon:"",
      temp:"",
      mintemp:"",
      maxtemp:"",
      woeid:""

    }

  }


  formatDate(MyDate) {

    var MyDateString;

    MyDateString = MyDate.getFullYear() + '-'
    + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
    + ('0' + MyDate.getDate()).slice(-2);

    return MyDateString;
  }

  componentDidMount() {

    let woeid = this.props.woeid;

    Axios('http://localhost:2000/api.php?command=location&woeid='+ woeid,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {

      var date = new Date;
      var today = this.formatDate(date);

      this.setState({ city: resp.data.title});
      this.setState({ consolidated_weather: resp.data.consolidated_weather});

      this.state.consolidated_weather.map(consolidated_weather => {
            if(consolidated_weather.applicable_date == today){
                this.setState({
                  icon:consolidated_weather.weather_state_abbr,
                  temp:Math.round(consolidated_weather.the_temp),
                  mintemp:Math.round(consolidated_weather.min_temp),
                  maxtemp:Math.round(consolidated_weather.max_temp),
                  woeid:woeid
                });
            }

      })


    });

  }

  render() {
  return (
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">{this.state.city}</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title"><img width="50" src={'/icons/'+ this.state.icon +'.svg'}/></h1>
          <h1 className="card-title pricing-card-title">{this.state.temp}°C</h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>Min: {this.state.mintemp}°C</li>
            <li>Max: {this.state.maxtemp}°C</li>
          </ul>
          <Link to={'/weather/'+ this.state.woeid} className="btn btn-lg btn-block btn-outline-primary">See more details</Link>
        </div>
      </div>
    )

  }

}



export default Weather;
