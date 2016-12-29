/* eslint-disable react/jsx-no-bind */
 
import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
const moment = require('moment');
require('moment-range');
import Util from './util';
import Cell from './cell';
import ViewHeader from './view-header';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);
export default class DayView extends React.Component {
    constructor(props) {
        super(props);
        const date = props.date ? moment(Util.toDate(props.date)) : null;
        const minDate = props.minDate ? moment(Util.toDate(props.minDate)) : null;
        const maxDate = props.maxDate ? moment(Util.toDate(props.maxDate)) : null;
        this.state = {
            date,
            minDate,
            maxDate
        };
    }
    render() {
        const titles = this.getDaysTitles().map((item, i) => {
            const _class = cx({
                cell: true,
                day: true
            });
            return (<Cell classes={_class} key={i} value={item.label}/>);
        });
        const days = this.getDays().map((item, i) => {
            const _class = cx({
                cell: true,
                current: item.curr,
                day: true,
                disabled: item.disabled,
                next: item.next,
                prev: item.prev,
                today: item.today
            });
            return (<Cell classes={_class} key={i} value={item.label}/>);
        });
        const currentDate = this.props.date ? this.props.date.format('MMMM YYYY') : moment().format('MMMM');
        return (<div className={styles['days-view']}>
        <ViewHeader data={currentDate} next={this.next.bind(this)} prev={this.prev.bind(this)} titleAction={this.props.nextView}/>
        <div className='days-title'>{titles}</div>
        <div className='days' onClick={this.cellClick.bind(this)}>{days}</div>
      </div>);
    }
    cellClick(e) {
        const cell = e.target;
        const date = parseInt(cell.innerHTML, 10);
        const newDate = this.props.date ? this.props.date.clone() : moment();
        if (isNaN(date)) {
            return;
        }
        if (cell.className.indexOf('prev') > -1) {
            newDate.subtract(1, 'months');
        } else if (cell.className.indexOf('next') > -1) {
            newDate.add(1, 'months');
        }
        newDate.date(date);
        this.props.setDate(newDate, true);
    }
    getDays() {
        const now = this.props.date ? this.props.date : moment();
        const currDay = now.date();
        const days = [];
        const end = now.clone().endOf('month').weekday(6);
        const maxDate = this.props.maxDate;
        const minDate = this.props.minDate;
        const month = now.month();
        const start = now.clone().startOf('month').weekday(0);
        const today = moment();
        const year = now.year();
        moment.range(start, end)
            .by('days', (day) => {
                days.push({
                    curr: day.date() === currDay && day.month() === month,
                    disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
                    label: day.format('D'),
                    next: day.month() > month || day.year() > year,
                    prev: (day.month() < month && !(day.year() > year)) || day.year() < year,
                    today: day.date() === today.date() && day.month() === today.month() && day.year() === today.year()
                });
            });
        return days;
    }
    getDaysTitles() {
        const now = moment();
        return ([0, 1, 2, 3, 4, 5, 6].map((i) => {
            const weekday = now.weekday(i).format('dd');
            return { label: weekday, val: weekday };
        }));
    }
    next() {
        let nextDate = this.props.date.clone().add(1, 'months');
        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
            nextDate = this.props.maxDate;
        }
        this.props.prevView(nextDate, 'next');
    }
    prev() {
        let prevDate = this.props.date.clone().subtract(1, 'months');
        if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
            prevDate = this.props.minDate;
        }
        this.props.prevView(prevDate, 'prv');
    }
}
DayView.propTypes = {
    date: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.any,
    minDate: React.PropTypes.any,
    nextView: React.PropTypes.func,
    setDate: React.PropTypes.func
};
