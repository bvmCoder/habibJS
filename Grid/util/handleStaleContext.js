/*
 * This is a temporary fix for when shouldComponentUpdate()
 * makes the context stale.
 * For reference check out react issue https://github.com/facebook/react/issues/2517
 */
let observerId = 0;
const observers = {};
export const forceContext = (Component) => {
    const componentWillUnmount = Component.prototype.componentWillUnmount;
    Component.prototype.componentDidMount = function () {
        // if (componentDidMount) componentDidMount.apply(this, arguments); // nothing uses this at the moment
        if (this.props.isRoot) {
            return;
        }
        this.observerId = observerId++;
        observers[this.observerId] = (newBreak) => {
            /*
             * If the context appears stale
             * force an update
             */
            if (this.context.cellblockBreak !== newBreak) {
                this.forceUpdate();
            }
        };
    };
    Component.prototype.componentWillUnmount = function () {
        if (componentWillUnmount) {
            componentWillUnmount.apply(this, arguments);
        }
        delete observers[this.observerId];
    };
    return Component;
};

// https://jslinterrors.com/the-body-of-a-for-in-should-be-wrapped-in-an-if-statement
export const updateObservers = (newBreakpoint) => {
    for (const o in observers) {
        if (observers.hasOwnProperty(o)) {
            observers[o](newBreakpoint);
        }
    }
};
