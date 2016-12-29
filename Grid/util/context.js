
const React = require("react");
const { PropTypes } = React;
const { number, bool, func, object } = PropTypes;
export default {
    cellblock: bool,
    cellblockBreak: number,
    cellblockColumn: object,
    cellblockGet: func
};
