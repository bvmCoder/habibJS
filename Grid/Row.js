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
import gridContext from './util/context';
import { classSet } from 'mdc-classnames';
import { Constants } from './util/constants';
// import { forceContext } from './util/handleStaleContext';

class Row extends Component {
    render() {
        const { cellblock, cellblockGet } = this.context;
        const v = cellblockGet('viewport')[1];
        const c = cellblockGet('columnWidth');
        const g = cellblockGet('gutterWidth');
        const style = cellblock ? null : {
            maxWidth: (v * c) + (v * g)
        };
        return (<div className={classSet(Constants.ROW, this.props.className)} style={style}>
        {this.props.children}
      </div>);
    }
    getChildContext() {
        return {
            cellblock: true
        };
    }
}

Row.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};
Row.contextTypes = gridContext;
Row.childContextTypes = gridContext;
/*
Row = __decorate([
    forceContext
], Row);
*/
export default Row;
