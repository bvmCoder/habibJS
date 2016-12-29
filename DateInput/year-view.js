/* eslint-disable react/jsx-no-bind */ 

import * as React from 'react';
const moment = require('moment');
require('moment-range');
import Cell from './cell';
import ViewHeader from './view-header';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);
export default class YearsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { years: [] };
    }
    render() {
        const years = this.state.years;
        const currYear = this.props.date.year();
        let _class;
        const yearsCells = years.map((item, i) => {
            _class = cx({
                cell: true,
                current: item.label === currYear,
                disabled: item.disabled,
                year: true
            });
            return (<Cell value={item.label} classes={_class} key={i}/>);
        });
        const currentDate = [
            years[0].label,
            years[years.length - 1].label
        ].join('-');
        return (<div className={styles['years-view']}>
        <ViewHeader data={currentDate} next={this.next.bind(this)} prev={this.prev.bind(this)}/>
        <div onClick={this.cellClick.bind(this)}>{yearsCells}</div>
      </div>);
    }
    componentWillMount() {
        this.getYears();
    }
    componentWillReceiveProps() {
        this.getYears();
    }
    cellClick(e) {
        const year = parseInt(e.target.innerHTML, 10);
        const date = this.props.date.clone().year(year);
        if (this.checkIfYearDisabled(date)) {
            return;
        }
        this.props.prevView(date);
    }
    checkIfYearDisabled(year) {
        return (year.clone().endOf('year').isBefore(this.props.minDate, 'day') ||
            year.clone().startOf('year').isAfter(this.props.maxDate, 'day'));
    }
    getYears() {
        const now = this.props.date;
        const start = now.clone().subtract(5, 'year');
        const end = now.clone().add(6, 'year');
        const currYear = now.year();
        const items = [];
        const inRange = this.rangeCheck(currYear);
        const { years } = this.state;
        if (years.length > 0 && inRange) {
            return years;
        }
        moment.range(start, end)
            .by('years', (year) => {
                items.push({
                    curr: currYear === year.year(),
                    disabled: this.checkIfYearDisabled(year),
                    label: year.format('YYYY')
                });
            });
        this.setState({ years: items });
        return items;
    }
    next() {
        let nextDate = this.props.date.clone().add(10, 'years');
        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
            nextDate = this.props.maxDate;
        }
        this.props.prevView(nextDate, 'next');
    }
    prev() {
        let prevDate = this.props.date.clone().subtract(10, 'years');
        if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
            prevDate = this.props.minDate;
        }
        this.props.prevView(prevDate, 'prv');
    }
    rangeCheck(currYear) {
        const { years } = this.state;
        if (years.length === 0) {
            return false;
        }
        return years[0].label <= currYear && years[years.length - 1].label >= currYear;
    }
}
YearsView.propTypes = {
    changeView: React.PropTypes.func,
    date: React.PropTypes.object,
    maxDate: React.PropTypes.any,
    minDate: React.PropTypes.any
};
