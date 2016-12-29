/*
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
*/


const React = require("react");
const { PropTypes, Component } = React;
import { gridFraction } from './util/validators';
import { Constants } from './util/constants';
import gridContext from './util/context';
import { classSet } from 'mdc-classnames';
const cellblock = require('cellblock');
// import { forceContext } from './util/handleStaleContext';

const decimalToPercent = function decimalToPercent(v) {
    return parseFloat((v * 100).toFixed(4)) + '%';
};
const fractionToPercent = function fractionToPercent(v) {
    const f = v.split('/');
    return decimalToPercent(parseInt(f[0], 10) / parseInt(f[1], 10));
};

class Column extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isRoot) {
            return (<div className={classSet(Constants.GRID, this.props.className)}>
          {this.props.children}
        </div>);
        }
        const className = classSet(Constants.COL, this.props.className);
        const width = this.grid.getFraction();
        const { offset } = this.props;
        const style = {};
        if (offset) {
            style.marginLeft = fractionToPercent(offset);
        }
        style.width = decimalToPercent(width[0] / width[1]);
        return (<div className={className} style={style}>
        {this.props.children}
      </div>);
    }
    getChildContext() {
        return {
            cellblockBreak: this.props.breakCount || this.context.cellblockBreak,
            cellblockColumn: this.grid
        };
    }
    componentWillMount() {
        const { cellblockColumn } = this.context;
        if (cellblockColumn) {
            this.grid = cellblock(cellblockColumn, this.props.width);
        } else {
            this.grid = cellblock();
        }
    }
    componentWillUpdate({ width }) {
        this.grid.setWidth(width);
    }
    componentWillUnmount() {
        this.grid.detach();
    }
}

Column.contextTypes = gridContext;
Column.childContextTypes = gridContext;
Column.propTypes = {
    breakCount: PropTypes.number,
    children: PropTypes.any,
    className: PropTypes.string,
    isRoot: PropTypes.bool,
    offset: gridFraction,
    viewport: PropTypes.array,
    width: gridFraction
};
/*
Column = __decorate([
    forceContext
], Column);
*/
export default Column;
