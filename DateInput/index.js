require('moment-range');
import * as React from 'react';
import { classSet } from 'mdc-classnames';
const moment = require('moment');
import DaysView from './day-view';
import MonthsView from './month-view';
import YearsView from './year-view';
import Util from './util';
const styles = require('./style.less');

export default class DateInput extends React.Component {
    constructor(props, context) { // eslint-disable-line max-statements
        super(props, context);
        const date = props.date ? moment(Util.toDate(props.date)) : null;
        const minDate = props.minDate ? moment(Util.toDate(props.minDate)) : null;
        const maxDate = props.maxDate ? moment(Util.toDate(props.maxDate)) : null;
        const format = props.format || 'MM-DD-YYYY';
        const minView = parseInt(props.minView, 10) || 0;
        const computableFormat = props.computableFormat || 'MM-DD-YYYY';
        const strictDateParsing = props.strictDateParsing || false;
        const parsingFormat = props.parsingFormat || format;
        this.state = {
            computableFormat, currentView: minView || 0,
            date,
            format,
            inputValue: date ? date.format(format) : undefined,
            isVisible: false,
            maxDate,
            minDate,
            minView,
            navigationDate: date,
            strictDateParsing,
            parsingFormat,
            views: ['days', 'months', 'years']
        };
        this.calendarClick = this.calendarClick.bind(this);
        this.nextView = this.nextView.bind(this);
        this.prevView = this.prevView.bind(this);
        this.setDate = this.setDate.bind(this);
        this.toggleClick = this.toggleClick.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
    }
    render() { // eslint-disable-line complexity, max-statements
        // its ok for this.state.date to be null, but we should never
        // pass null for the date into the calendar pop up, as we want
        // it to just start on todays date if there is no date set
        const calendarDate = this.state.date || moment();
        let view;
        switch (this.state.currentView) {
            case 0:
                view = (<DaysView date={calendarDate} nextView={this.nextView} maxDate={this.state.maxDate} minDate={this.state.minDate} prevView={this.prevView} setDate={this.setDate}/>);
                break;
            case 1:
                view = (<MonthsView date={calendarDate} nextView={this.nextView} maxDate={this.state.maxDate} minDate={this.state.minDate} prevView={this.prevView} setDate={this.setDate}/>);
                break;
            case 2:
                view = (<YearsView date={calendarDate} maxDate={this.state.maxDate} minDate={this.state.minDate} prevView={this.prevView} setDate={this.setDate}/>);
                break;
            default:
                view = (<DaysView date={calendarDate} nextView={this.nextView} maxDate={this.state.maxDate} minDate={this.state.minDate} setDate={this.setDate}/>);
        }
        //const todayText = this.props.todayText || (moment.locale() === 'de' ? 'Heute' : 'Today');
        const calendarClass = classSet({
            'input-calendar-wrapper': true,
            'icon-hidden': this.props.hideIcon
        });
        const calendar = !this.state.isVisible || this.props.disabled ? '' :
            (<div className={styles[calendarClass]} onClick={this.calendarClick}>
        {view}
        <span className={styles[`today-btn${this.checkIfDateDisabled(moment().startOf('day')) ? ' disabled' : ' '}`]} onClick={this.todayClick} />
      </div>);
        let readOnly = false;
        if (this.props.hideTouchKeyboard) {
            // do not break server side rendering:
            try {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                    .test(navigator.userAgent)) {
                    readOnly = true;
                }
            } catch (e) {
                console.warn(e); // eslint-disable-line
            }
        }
        let calendarIcon;
        if (this.props.customIcon === undefined) {
            // Do not show calendar icon if hideIcon is true
            calendarIcon = this.props.hideIcon || this.props.disabled ? '' :
                (<span className={styles['icon-wrapper calendar-icon']} onClick={this.toggleClick}>
          <svg width='16' height='16' viewBox='0 0 16 16'>
            <path d='M5 6h2v2h-2zM8 6h2v2h-2zM11 6h2v2h-2zM2 12h2v2h-2zM5 12h2v2h-2zM8 12h2v2h-2zM5 9h2v2h-2zM8 9h2v2h-2zM11 9h2v2h-2zM2 9h2v2h-2zM13 0v1h-2v-1h-7v1h-2v-1h-2v16h15v-16h-2zM14 15h-13v-11h13v11z'/>
          </svg>
        </span>);
        } else {
            calendarIcon = (<span className={styles[classSet('icon-wrapper', 'calendar-icon', this.props.customIcon)]} onClick={this.toggleClick}/>);
        }
        const inputClass = this.props.inputFieldClass || 'input-calendar-field';
        return (<div className={styles['input-calendar']}>
        <input name={this.props.inputName} className={styles[inputClass]} id={this.props.inputFieldId} 
            onBlur={this.inputBlur} onChange={this.changeDate} 
            onFocus={this.inputFocus} placeholder={this.props.placeholder} 
            readOnly={readOnly} disabled={this.props.disabled} type='text' value={this.state.inputValue}
        />
        {calendarIcon}
        {calendar}
      </div>);
    }
    componentDidMount() {
        document.addEventListener('click', this.documentClick.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date ? moment(Util.toDate(nextProps.date)) : this.state.date,
            inputValue: nextProps.date
                ? moment(Util.toDate(nextProps.date)).format(this.state.format) : null,
            isVisible: nextProps.disabled === true,
            maxDate: nextProps.maxDate ? moment(Util.toDate(nextProps.maxDate)) : this.state.maxDate,
            minDate: nextProps.minDate ? moment(Util.toDate(nextProps.minDate)) : this.state.minDate
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.documentClick.bind(this));
    }
    changeDate(e) {
        this.setState({ inputValue: e.target.value });
    }
    checkIfDateDisabled(date) {
        return date && this.state.minDate && date.isBefore(this.state.minDate, 'day')
            || date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day');
    }
    documentClick() {
        // e.preventDefault();
        if (!this.state.isCalendar) {
            this.setVisibility(false);
        }
        this.setState({ isCalendar: false });
    }
    inputBlur(e) { // eslint-disable-line max-statements
        let newDate = null;
        let computableDate = null;
        const date = this.state.inputValue;
        const format = this.state.format;
        const parsingFormat = this.state.parsingFormat;
        if (date) {
            // format, with strict parsing true, so we catch bad dates
            newDate = moment(date, parsingFormat, true);
            // if the new date didn't match our format, see if the native
            // js date can parse it
            if (!newDate.isValid() && !this.props.strictDateParsing) {
                let d = new Date(date);
                // if native js cannot parse, just make a new date
                if (!d.getTime()) {
                    d = new Date();
                }
                newDate = moment(d);
            }
            computableDate = newDate.format(this.state.computableFormat);
        }
        this.setState({
            date: newDate,
            inputValue: newDate ? newDate.format(format) : null
        });
        if (this.props.onChange) {
            this.props.onChange(computableDate);
        }
        if (this.props.onBlur) {
            this.props.onBlur(e, computableDate);
        }
    }
    inputFocus(e) {
        if (this.props.openOnInputFocus) {
            this.toggleClick();
        }
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }
    keyDown(e) {
        Util.keyDownActions.call(this, e.keyCode);
    }
    nextView() {
        if (this.checkIfDateDisabled(this.state.date)) {
            return;
        }
        this.setState({ currentView: ++this.state.currentView });
    }
    prevView(date, btnSource = 'default') { // eslint-disable-line max-statements, complexity
        let newDate = date;
        if (this.state.minDate && date.isBefore(this.state.minDate, 'day')) {
            newDate = this.state.minDate.clone();
        }
        if (this.state.maxDate && date.isAfter(this.state.maxDate, 'day')) {
            newDate = this.state.maxDate.clone();
        }
        if (this.state.currentView === this.state.minView) {
            if (btnSource === 'prv' || btnSource === 'next') {
                this.setState({
                    date: newDate
                });
            } else {
                this.setState({
                    date,
                    currentView: --this.state.currentView
                });
            }
            if (this.props.onChange) {
                this.props.onChange(date.format(this.state.computableFormat));
            }
        } else if (this.state.currentView === 1) {
            if (btnSource === 'prv' || btnSource === 'next') {
                this.setState({
                    date: newDate
                });
            } else {
                this.setState({
                    date,
                    currentView: --this.state.currentView
                });
            }
        } else if (btnSource === 'prv' || btnSource === 'next') {
            this.setState({
                date: newDate
            });
        } else {
            this.setState({
                date,
                currentView: --this.state.currentView
            });
        }
    }
    setDate(date, isDayView = true) {
        if (this.checkIfDateDisabled(date)) {
            return;
        }
        this.setState({
            date,
            inputValue: date.format(this.state.format),
            isVisible: this.props.closeOnSelect
                && isDayView ? !this.state.isVisible : this.state.isVisible
        });
        if (this.props.onChange) {
            this.props.onChange(date.format(this.state.computableFormat));
        }
    }
    setVisibility(val) {
        const value = val !== undefined ? val : !this.state.isVisible;
        const eventMethod = value ? 'addEventListener' : 'removeEventListener';
        document[eventMethod]('keydown', this.keyDown);
        if (this.state.isVisible !== value && !this.props.disabled) {
            this.setState({ isVisible: value });
        }
    }
    calendarClick() {
        this.setState({ isCalendar: true });
    }
    todayClick() {
        const today = moment().startOf('day');
        if (this.checkIfDateDisabled(today)) {
            return;
        }
        this.setState({
            currentView: this.state.minView,
            date: today,
            inputValue: today.format(this.state.format)
        });
        if (this.props.onChange) {
            this.props.onChange(today.format(this.state.computableFormat));
        }
    }
    toggleClick() {
        this.setState({ isCalendar: true });
        this.setVisibility();
    }
}
DateInput.propTypes = {
    closeOnSelect: React.PropTypes.bool,
    computableFormat: React.PropTypes.string,
    customIcon: React.PropTypes.string,
    date: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    format: React.PropTypes.string,
    hideIcon: React.PropTypes.bool,
    hideTouchKeyboard: React.PropTypes.bool,
    inputFieldClass: React.PropTypes.string,
    inputFieldId: React.PropTypes.string,
    inputName: React.PropTypes.string,
    maxDate: React.PropTypes.any,
    minDate: React.PropTypes.any,
    minView: React.PropTypes.number,
    navigationDate: React.PropTypes.any,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    openOnInputFocus: React.PropTypes.bool,
    parsingFormat: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    placeholder: React.PropTypes.string,
    strictDateParsing: React.PropTypes.bool,
    todayText: React.PropTypes.string
};
