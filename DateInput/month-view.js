/* eslint-disable react/jsx-no-bind */ 

import * as React from 'react';
const moment = require('moment');
require('moment-range');
import Util from './util';
import Cell from './cell';
import ViewHeader from './view-header';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);
export default class MonthView extends React.Component {
    constructor(props) {
        super(props);
        const date = props.date ? moment(Util.toDate(props.date)) : null;
        const maxDate = props.maxDate ? moment(Util.toDate(props.maxDate)) : null;
        const minDate = props.minDate ? moment(Util.toDate(props.minDate)) : null;
        this.state = {
            date,
            maxDate,
            minDate
        };
    }
    render() {
        const currentDate = this.props.date.format('YYYY');
        const months = this.getMonth().map((item, i) => {
            const _class = cx({
                cell: true,
                current: item.curr,
                disabled: item.disabled,
                month: true
            });
            return (<Cell classes={_class} key={i} value={item.label}/>);
        });
        return (<div className={styles['months-view']}>
        <ViewHeader data={currentDate} next={this.next.bind(this)} prev={this.prev.bind(this)} titleAction={this.props.nextView}/>
        <div onClick={this.cellClick.bind(this)}>{months}</div>
      </div>);
    }
    cellClick(e) {
        const month = e.target.innerHTML;
        if (this.checkIfMonthDisabled(month)) {
            return;
        }
        const date = this.props.date.clone().month(month);
        this.props.prevView(date);
    }
    checkIfMonthDisabled(month) {
        const now = this.props.date;
        return (now.clone().month(month).endOf('month').isBefore(this.props.minDate, 'day') ||
            now.clone().month(month).startOf('month').isAfter(this.props.maxDate, 'day'));
    }
    getMonth() {
        const month = this.props.date.month();
        return moment.monthsShort().map((item, i) => {
            return {
                curr: i === month,
                disabled: this.checkIfMonthDisabled(i),
                label: item
            };
        });
    }
    next() {
        let nextDate = this.props.date.clone().add(1, 'years');
        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
            nextDate = this.props.maxDate;
        }
        this.props.prevView(nextDate, 'next');
        // this.props.setDate(nextDate);
    }
    prev() {
        let prevDate = this.props.date.clone().subtract(1, 'years');
        if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
            prevDate = this.props.minDate;
        }
        this.props.prevView(prevDate, 'prv');
        // this.props.setDate(prevDate);
    }
}
MonthView.propTypes = {
    date: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.any,
    minDate: React.PropTypes.any,
    nextView: React.PropTypes.func
};
