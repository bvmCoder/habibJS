/* eslint-disable */
import ReactDOM from 'react-dom';
import EventObject from './EventObject';

const addDOMEventListener = (target, eventType, callback) => {
    function wrapCallback(e) {
        const ne = new EventObject(e);
        callback.call(target, ne);
    }

    if (target.addEventListener) {
        target.addEventListener(eventType, wrapCallback, false);
        return {
            remove() {
              target.removeEventListener(eventType, wrapCallback, false);
          }
        };
    } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, wrapCallback);
        return {
          remove() {
              target.detachEvent('on' + eventType, wrapCallback);
          }
      };
    }
};

const addEventListener = (target, eventType, cb) => {
    const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
        ReactDOM.unstable_batchedUpdates(cb, e);
    } : cb;
    return addDOMEventListener(target, eventType, callback);
};

export default addEventListener;