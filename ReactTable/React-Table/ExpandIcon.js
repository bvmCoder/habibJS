import React, { PropTypes } from "react";
import shallowequal from "./toRemove/shallowequal";

class ExpandIcon extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return !shallowequal(nextProps, this.props);
    }

    handleOnClick(e) {
        const { onExpand, expanded, record } = this.props;
        onExpand(!expanded, record, e);
    }

    render() {
        const { expandable, prefixCls, needIndentSpaced, expanded } = this.props;
        if (expandable) {
            const expandClassName = expanded ? "expanded" : "collapsed";
            return (
              <span
                  className={`${prefixCls}-expand-icon ${prefixCls}-${expandClassName}`}
                  onClick={this.handleOnClick}
              />
            );
        } else if (needIndentSpaced) {
            return <span className={`${prefixCls}-expand-icon ${prefixCls}-spaced`} />;
        }
        return null;
    }
}

ExpandIcon.propTypes = {
    record: PropTypes.object,
    prefixCls: PropTypes.string,
    expandable: PropTypes.any,
    expanded: PropTypes.bool,
    needIndentSpaced: PropTypes.bool,
    onExpand: PropTypes.func
};

export default ExpandIcon;
