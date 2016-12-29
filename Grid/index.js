const React = require("react");
const { PropTypes, Component } = React;
import Column from './Column';
import Style from './util/Style';
import * as eventListener from 'eventlistener';
import gridContext from './util/context';
import getThreshold from './util/getThreshold';
import { validBreakpoint, validBreakpoints } from './util/validators';
/*
 * A patch:
 * shouldComponentUpdate() can block context updates
 * so we need to add a fallback method for
 * updating interested components.
 * When React offers a better way, this should be removed
 */
let breakCount = 0; // everytime grid changes, increment so we can check for staleness
import { updateObservers } from './util/handleStaleContext';
export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.syncGrid = this.syncGrid.bind(this);
        this.updateGrid = this.updateGrid.bind(this);
        // set initial state
        this.state = { breakpoint: this.props.initialBreakpoint };
    }
    getChildContext() {
        const { props } = this;
        const getViewport = function () {
            return [this.state.breakpoint, this.getMaxBreakPoint(this.state.breakpoint)];
        }.bind(this);
        return {
            cellblockGet(key) {
                switch (key) {
                    case 'gutterWidth':
                        return props.gutterWidth;
                    case 'columnWidth':
                        return props.columnWidth;
                    case 'viewport':
                        return getViewport();
                    default:
                        throw new Error(`invalid key ${key}`);
                }
            }
        };
    }
    componentWillMount() {
        const { breakpoints, columnWidth, gutterWidth } = this.props;
        const thresholds = breakpoints.map((p) => (p * columnWidth) + (p * gutterWidth));
        const breakpoint = this.state.breakpoint || this.props.breakpoints[getThreshold(thresholds)];
        this.setState({
            breakCount: 0,
            breakpoint,
            thresholds
        });
    }
    componentDidMount() {
        this.syncGrid(true);
        eventListener.add(window, 'resize', this.syncGrid);
    }
    componentWillUnmount() {
        eventListener.remove(window, 'resize', this.syncGrid);
    }
    getMaxBreakPoint(minBreakpoint) {
        const { breakpoints, flexible } = this.props;
        if (!flexible ||
            (Array.isArray(flexible) && flexible.indexOf(minBreakpoint) === -1)) {
            return minBreakpoint;
        } else {
            const nextPoint = breakpoints[breakpoints.indexOf(minBreakpoint) + 1];
            return nextPoint || breakpoints[breakpoints.length - 1];
        }
    }
    syncGrid(triggerChange) {
        const b = this.props.breakpoints[getThreshold(this.state.thresholds)];
        const isChange = (b !== this.state.breakpoint);
        if (isChange) {
            this.updateGrid(b);
        }
        if (isChange || triggerChange === true) {
            this.props.onChange(b);
        }
    }
    updateGrid(b) {
        breakCount = breakCount += 1; // This is for the patch
        this.setState({
            breakCount,
            breakpoint: b
        });
        updateObservers(breakCount); // This is for the patch
    }
    render() {
        const breakpoint = this.state.breakpoint;
        const breakCount2 = this.state.breakCount;
        const { className, gutterWidth, children } = this.props;
        const breakPointRange = [breakpoint, this.getMaxBreakPoint(breakpoint)];
        return (<Column isRoot viewport={breakPointRange} breakCount={breakCount2} className={className}>
        <Style gutter={gutterWidth}/>
        {children}
      </Column>);
    }
}
Grid.propTypes = {
    breakpoints: validBreakpoints,
    children: PropTypes.any,
    className: PropTypes.string,
    columnWidth: PropTypes.number,
    flexible: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    gutterWidth: PropTypes.number,
    initialBreakpoint: validBreakpoint,
    onChange: PropTypes.func
};
Grid.childContextTypes = gridContext;
Grid.defaultProps = {
    breakpoints: [4, 8, 12, 16],
    columnWidth: 41,
    flexible: true,
    gutterWidth: 30,
    onChange() { }
};
