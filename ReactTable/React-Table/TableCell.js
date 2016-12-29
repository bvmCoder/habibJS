import React, { PropTypes } from "react";
import objectPath from "./toRemove/object-path";

class TableCell extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    isInvalidRenderCellText(text) {
        return text && !React.isValidElement(text) &&
          Object.prototype.toString.call(text) === "[object Object]";
    }

    handleClick(e) {
        const { record, column: { onCellClick } } = this.props;
        if (onCellClick) {
            onCellClick(record, e);
        }
    }

    calculateRowAndColSpan(render, record, index, text) {
        let tdProps;
        let colSpan;
        let rowSpan;

        if (render) {
            text = render(text, record, index);
            if (this.isInvalidRenderCellText(text)) {
                tdProps = text.props || {};
                rowSpan = tdProps.rowSpan;
                colSpan = tdProps.colSpan;
                text = text.children;
            }
        }

        return { rowSpan, colSpan, text };
    }

    render() {
        const { record, indentSize, prefixCls, indent, index, expandIcon, column } = this.props;
        const { dataIndex, render, className = "" } = column;

        let text = objectPath.get(record, dataIndex);

        const result = this.calculateRowAndColSpan(render, record, index, text);
        const { rowSpan, colSpan } = result;
        text = result.text;

        if (this.isInvalidRenderCellText(text)) {
            text = null;
        }

        const indentText = expandIcon ? (
          <span
              style={{ paddingLeft: `${indentSize * indent}px` }}
              className={`${prefixCls}-indent indent-level-${indent}`}
          />
        ) : null;

        if (rowSpan === 0 || colSpan === 0) {
            return null;
        }

        return (
          <td
              colSpan={colSpan}
              rowSpan={rowSpan}
              className={className}
              onClick={this.handleClick}
          >
            {indentText}
            {expandIcon}
            {text}
          </td>
        );
    }
}

TableCell.propTypes = {
    record: PropTypes.object,
    prefixCls: PropTypes.string,
    index: PropTypes.number,
    indent: PropTypes.number,
    indentSize: PropTypes.number,
    column: PropTypes.object,
    expandIcon: PropTypes.node
};

export default TableCell;
