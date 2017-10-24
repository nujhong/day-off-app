import _ from 'lodash';
import * as moment from 'moment';
import React, { Component } from 'react';
import { getHolidays } from '../api/holidays';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Holiday from './Holiday'
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      holidays: [],
      isHoliday: false,
      nextHoliday: null,
      region: '',
      today: moment().format('YYYYMMDD')
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(dateObj) {
    let date = moment(dateObj).format('YYYYMMDD');
    let nextHoliday = this.findNextHoliday(date, this.state.holidays);
    let isHoliday = (nextHoliday['Date'] === date);
    this.setState({ today: date, nextHoliday, isHoliday })
  }

  findNextHoliday(date, holidays) {
    return _.find(holidays, holiday => {
      return holiday['Date'] >= date;
    });
  }

  componentDidMount() {
    getHolidays().then((holidays) => {
      let nextHoliday = this.findNextHoliday(this.state.today, holidays);
      let isHoliday = (nextHoliday['Date'] === this.state.today);
      this.setState({ holidays, isHoliday, nextHoliday })
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <Holiday {...this.state} onDateChange={this.handleDateChange}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
