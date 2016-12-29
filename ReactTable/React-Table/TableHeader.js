import React, { PropTypes } from "react";
import shallowequal from "./toRemove/shallowequal";

class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        const sortColumns = props.sortColumns;
        if (sortColumns) {
            if (!sortColumns.sortOrderOptions) {
                sortColumns.sortOrderOptions = [{sortOrder: "asc", icon: null}, {sortOrder: "desc", icon: null}];
            }
            if (!sortColumns.currSortOrder) {
                sortColumns.currSortOrder = "asc";
            }
            this.state = {
                sortColumns
            };
            this.order = this.order.bind(this);
            this.sortOrderChange = this.sortOrderChange.bind(this);
            this.orderAddIcon = this.orderAddIcon.bind(this);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const isPropsChanged = !shallowequal(nextProps, this.props);
        const isStateChanged = !shallowequal(nextState, this.state);
        return isStateChanged || isPropsChanged;
    }

    order(cellProps, e) {
        if (this.state.sortColumns && this.state.sortColumns.length > 0) {
            const columnIndex = this.state.sortColumns.findIndex(
                (item) => item.columnName.toLowerCase() === cellProps.key
            );
            if (columnIndex >= 0) {
                this.sortOrderChange(columnIndex);
                const column = this.state.sortColumns[columnIndex];
                this.props.sortOrder(column.columnName, column.currSortOrder, e);
            }
        }
        return;
    }
    sortOrderChange(colunmIndex) {
        const columns = Object.assign([], this.state.sortColumns);
        const column = columns[colunmIndex];
        const len = column.sortOrderOptions.length;
        let index = column.currSortOrder ?
            column.sortOrderOptions.findIndex((item) => item.sortOrder === column.currSortOrder) + 1 : 1;
        index = index < len ? index : 0;
        column.currSortOrder = column.sortOrderOptions[index].sortOrder;
        this.setState({sortColumns: columns});
    }
    orderAddIcon(cellProps) {
        if (this.state.sortColumns && this.state.sortColumns.length > 0) {
            const columnIndex = this.state.sortColumns.findIndex(
                (item) => item.columnName.toLowerCase() === cellProps.key
            );
            if (columnIndex >= 0) {
                const column = this.state.sortColumns[columnIndex];
                let icon = column.sortOrderOptions.find((item) => item.sortOrder === column.currSortOrder).icon;
                icon = icon ? icon : <span>{column.currSortOrder}</span>;
                cellProps.children = (
                    <div>
                        <div style={{"display": "inline-block"}}>{column.columnName}</div>
                        <div style={{"display": "inline-block"}}>{icon}</div>
                    </div>
                );
            }
        }
        return cellProps;
    }

    render() {
        const { prefixCls, rowStyle, rows, sortColumns} = this.props;
        return (
            <thead className={`${prefixCls}-thead`}>
              {
                  rows.map((row, index) => (
                    <tr key={index} style={rowStyle}>
                        {row.map(
                            (cellProps, i) => {
                                if (sortColumns) {
                                    cellProps = this.orderAddIcon(cellProps);
                                    return <th {...cellProps} key={i} onClick={(e) => this.order(cellProps, e)} />;
                                }
                                return <th {...cellProps} key={i} />;
                            }
                        )}
                    </tr>
                  ))
              }
            </thead>
        );
    }
}

TableHeader.propTypes = {
    prefixCls: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
    sortColumns: PropTypes.array,
    sortOrder: PropTypes.func
};

export default TableHeader;
