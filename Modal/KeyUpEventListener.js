import { Component, PropTypes } from 'react';

const on = (target, eventName, callback, capture) => {
    if (target.addEventListener) {
        target.addEventListener(eventName, callback, capture);
    } else if (target.attachEvent) {
        target.attachEvent(`on${eventName}`, () => {
            callback.call(target);
        });
    }
};

const off = (target, eventName, callback, capture) => {
    if (target.removeEventListener) {
        target.removeEventListener(eventName, callback, capture);
    } else if (target.detachEvent) {
        target.detachEvent(`on${eventName}`, callback);
    }
};

// see https://github.com/oliviertassinari/react-event-listener/blob/master/src/index.js
class KeyUpEventListener extends Component {
    render() {
        return null;
    }
    componentDidMount() {
        this.addListeners();
    }
    componentWillUnmount() {
        this.removeListeners();
    }
    addListeners() {
        on(window, 'keyup', this.props.onKeyUp);
    }
    removeListeners() {
        off(window, 'keyup', this.props.onKeyUp);
    }
}
KeyUpEventListener.propTypes = {
    onKeyUp: PropTypes.func.isRequired
};
export default KeyUpEventListener;
