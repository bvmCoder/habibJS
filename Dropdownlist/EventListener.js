const React = require("react");
const { PropTypes, Component } = React;

const on = function on(target, eventName, callback, capture) {
    if (target.addEventListener) {
        target.addEventListener(eventName, callback, capture);
    } else if (target.attachEvent) {
        target.attachEvent(`on${eventName}`, () => {
            callback.call(target);
        });
    }
};
const off = function off(target, eventName, callback, capture) {
    if (target.removeEventListener) {
        target.removeEventListener(eventName, callback, capture);
    } else if (target.detachEvent) {
        target.detachEvent(`on${eventName}`, callback);
    }
};

export class EventListener extends Component {
    componentDidMount() {
        this._target = this.getTarget();
        this.addListeners();
    }
    componentWillUnmount() {
        this.removeListeners();
    }
    render() {
        return null;
    }
    getTarget() {
        const target = this.props.target;
        if (!target) {
            return window;
        }
        if (typeof target === 'string') {
            return window[target];
        }
        if (typeof target === 'function') {
            return target();
        }
        return target;
    }
    addListeners() {
        on(this._target, this.props.eventName, this.props.onEvent, null);
    }
    removeListeners() {
        off(this._target, this.props.eventName, this.props.onEvent, null);
    }
}
EventListener.propTypes = {
    eventName: PropTypes.string.isRequired,
    onEvent: PropTypes.func,
    target: PropTypes.any
};
