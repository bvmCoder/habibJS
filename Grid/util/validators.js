const React = require("react");
const { PropTypes } = React;
const FRACTION_RE = /^\d+\/\d+$/;

const isString = (val) => typeof val === 'string';

const isNumber = (val) => typeof val === 'number';

const isFraction = (val) => isString(val) && FRACTION_RE.test(val);

const isInteger = (val) => isNumber(val) && (val % 1) === 0;

const isSorted = (arr) => {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
};
const isAllIntegers = (arr) => {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        if (!isInteger(arr[i])) {
            return false;
        }
    }
    return true;
};
const createError = (props, propName, componentName, message) => {
    const str = `Invalid prop ${propName} of value ${props[propName]} supplied to ${componentName}`;
    return new Error(str + ', ' + message);
};

const gridFraction = (props, propName, componentName) => {
    const value = props[propName];
    if (props[propName] && !isFraction(value)) {
        return createError(props, propName, componentName, 'expected a fraction string `a/b` (ie: 2/3)');
    }
    return null;
};
const validBreakpoint = (props, propName) => {
    if (typeof window === 'undefined' && !props[propName]) {
        return new Error('Isomorphic grids require an initialBreakpoint');
    }
    return PropTypes.oneOf(props.breakpoints).apply(null, arguments);
};
const validBreakpoints = (props, propName, componentName) => {
    switch (true) {
        case !Array.isArray(props[propName]) || !isAllIntegers(props[propName]):
            return createError(props, propName, componentName, 'expected an array of integers');
        case !isSorted(props[propName]):
            return createError(props, propName, componentName, 'expected ascending order');
        default:
            return null;
    }
};

export default {
    gridFraction,
    validBreakpoint,
    validBreakpoints
};
