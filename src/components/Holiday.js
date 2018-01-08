import React from 'react';
import * as moment from 'moment';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import './Holiday.css';

const Holiday = (props) => {
  let {today, holidays, isHoliday, nextHoliday, onDateChange } = props;

  if (!nextHoliday) {
    return <CircularProgress size={80} thickness={5} />;
  }

  return (
    <Card className='Holiday'>
      <AppBar
        title="Holiday Calendar"
        iconElementLeft={<IconButton><ActionDateRange /></IconButton>}
      />
      <CardHeader
        title={isHoliday? "Ayyyyy! Today is a public holiday" : "Hang in there, your next dayoff is ..."}
        subtitle={`${nextHoliday['Holiday Name']} ${moment(nextHoliday['Date']).format('DD/MM/YYYY')}`}
      />
      <CardText className="text-muted font-weight-light font-italic">
        {nextHoliday['Information']}
      </CardText>
      <CardActions>
        <DatePicker
          className="pl-2"
          minDate={moment(holidays[0]['Date']).startOf('year').toDate()}
          maxDate={moment(holidays[holidays.length-1]['Date']).toDate()}
          hintText="Change the date here ;)"
          autoOk={true}
          onChange={(e, date) => onDateChange(date)}
          mode="landscape"/>
      </CardActions>

      { isHoliday && (
        <blockquote className="pt-5 blockquote text-center">
          <p>Enjoy free parking today!</p>
        </blockquote>
      )}

    </Card>
  )
};

export default Holiday;
