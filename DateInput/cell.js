import * as React from 'react';
require('moment-range');
const styles = require('./style.less'); //eslint-disable-line
export default class Cell extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { classes: this.props.classes, value: this.props.value };
    }
    
    render() {
        const _classes = `${this.props.classes} cell`;
        return (<div className={_classes}>{this.props.value}</div>);
    }
    
}
Cell.propTypes = {
    classes: React.PropTypes.string,
    value: React.PropTypes.any
};
