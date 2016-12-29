import React, { PropTypes, Component } from "react";
// import * as ReactDOM from "react-dom";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { measureScrollbar } from "./utils";
import ColumnManager from "./ColumnManager";
import createStore from "./createStore";
// import { debounce } from "./utils";

class FixTableHeader extends Component {
    constructor(props) {
        super(props);
        this.columnManager = new ColumnManager(props.columns, props.children);
        this.bindContext();
        this.store = createStore({ currentHoverKey: null });
    }

    bindContext() {
        this.handleTableMouseDown = this.handleTableMouseDown.bind(this);
        this.handleFixTableScroll = this.handleFixTableScroll.bind(this);
        this.handleTableScroll = this.handleTableScroll.bind(this);
    }

    componentDidMount() {
        this.resetScrollY();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.columns && nextProps.columns !== this.props.columns) {
            this.columnManager.reset(nextProps.columns);
        } else if (nextProps.children !== this.props.children) {
            this.columnManager.reset(null, nextProps.children);
        }
    }

    getRowKey(record, index) {
        const rowKey = this.props.rowKey;
        if (typeof rowKey === "function") {
            return rowKey(record, index);
        }
        return typeof record[rowKey] !== "undefined" ? record[rowKey] : index;
    }

    getExpandedRows() {
        return this.props.expandedRowKeys || this.props.defaultState.expandedRowKeys;
    }

    getHeader(columns, fixed) {
        const { showHeader, expandIconAsCell, prefixCls, sortColumns, sortOrder } = this.props;
        const rows = this.getHeaderRows(columns);
        const isExpandCellHeader = this.columnManager.isAnyColumnsFixed() ?
                                    (expandIconAsCell && fixed === "left") : expandIconAsCell;

        if (isExpandCellHeader) {
            rows[0].unshift({
                key: "rc-table-expandIconAsCell",
                className: `${prefixCls}-expand-icon-th`,
                title: "",
                rowSpan: rows.length
            });
        }

        const trStyle = fixed ? this.getHeaderRowStyle(columns, rows) : null;

        return showHeader ? (
            <TableHeader
                prefixCls={prefixCls}
                rows={rows}
                rowStyle={trStyle}
                sortColumns={sortColumns}
                sortOrder={sortOrder}
            />
        ) : null;
    }

    getHeaderRows(columns, currentRow = 0, rows) {
        rows = rows || [];
        rows[currentRow] = rows[currentRow] || [];

        columns.forEach((column) => {
            if (column.rowSpan && rows.length < column.rowSpan) {
                while (rows.length < column.rowSpan) {
                    rows.push([]);
                }
            }
            const cell = {
                key: column.key,
                className: column.className || "",
                children: column.title
            };
            if (column.children) {
                this.getHeaderRows(column.children, currentRow + 1, rows);
            }
            if ("colSpan" in column) {
                cell.colSpan = column.colSpan;
            }
            if ("rowSpan" in column) {
                cell.rowSpan = column.rowSpan;
            }
            if (cell.colSpan !== 0) {
                rows[currentRow].push(cell);
            }
        });
        return rows.filter((row) => row.length > 0);
    }

    getExpandedRow(key, content, visible, className, fixed) {
        const { prefixCls, expandIconAsCell } = this.props;
        let colCount;
        if (fixed === "left") {
            colCount = this.columnManager.leftLeafColumns().length;
        } else if (fixed === "right") {
            colCount = this.columnManager.rightLeafColumns().length;
        } else {
            colCount = this.columnManager.leafColumns().length;
        }
        const columns = [{
            key: "extra-row",
            render: () => ({
                props: {
                    colSpan: colCount
                },
                children: fixed !== "right" ? content : "&nbsp;"
            })
        }];
        if (expandIconAsCell && fixed !== "right") {
            columns.unshift({
                key: "expand-icon-placeholder",
                render: () => null
            });
        }
        return (
            <TableRow
                columns={columns}
                visible={visible}
                className={className}
                key={`${key}-extra-row`}
                prefixCls={`${prefixCls}-expanded-row`}
                indent={1}
                expandable={false}
                store={this.store}
            />
        );
    }

    createRow(options) {
        const {record, props, index, indent, fixed, needIndentSpaced, isRowExpanded,
                expandIconAsCell, visible, expandIconColumnIndex, key, childrenColumn} = options;
        const { childrenColumnName, expandedRowRender, expandRowByClick,
                rowClassName, rowRef, onRowClick, onRowDoubleClick } = props;
        const { fixedColumnsBodyRowsHeight } = this.props.defaultState;
        const className = rowClassName(record, index, indent);

        const height = (fixed && fixedColumnsBodyRowsHeight[index]) ?
            fixedColumnsBodyRowsHeight[index] : null;

        let leafColumns = this.columnManager.leafColumns();
        if (fixed === "left") {
            leafColumns = this.columnManager.leftLeafColumns();
        } else if (fixed === "right") {
            leafColumns = this.columnManager.rightLeafColumns();
        }

        return (
          <TableRow
              indent={indent}
              indentSize={props.indentSize}
              needIndentSpaced={needIndentSpaced}
              className={className}
              record={record}
              expandIconAsCell={expandIconAsCell}
              index={index}
              visible={visible}
              expandRowByClick={expandRowByClick}
              expandable={childrenColumn || expandedRowRender}
              expanded={isRowExpanded}
              prefixCls={`${props.prefixCls}-row`}
              childrenColumnName={childrenColumnName}
              columns={leafColumns}
              expandIconColumnIndex={expandIconColumnIndex}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              height={height}
              key={key}
              hoverKey={key}
              ref={rowRef(record, index, indent)}
              store={this.store}
          />);
    }

    getExpandedRelatedParam(options) {
        const {childrenColumnName, data, fixed, expandIconAsCell, expandIconColumnIndex} = options;
        const needIndentSpaced = data.some((record) => record[childrenColumnName]);
        const isExpandIconAsCell = fixed === "left" ? expandIconAsCell : false;
        const expandIconAsCellAdjusted = this.columnManager.isAnyColumnsFixed() ? isExpandIconAsCell : expandIconAsCell;
        const nonExpandIconColumnIndex = -1;
        const expandIconColumnIndexTemp = fixed === "left" ? expandIconColumnIndex : nonExpandIconColumnIndex;
        const expandIconColumnIndexAdjusted = this.columnManager.isAnyColumnsFixed() ?
                                      expandIconColumnIndexTemp : expandIconColumnIndex;

        return {
            needIndentSpaced,
            expandIconAsCellAdjusted,
            expandIconColumnIndexAdjusted
        };
    }

    concatExpandedAndChildRows(params, rows) {
        const {expandedRowRender, isRowExpanded, record, fixed, childrenColumn, columns,
                index, indent, visible, key, expandedRowClassName} = params;
        let expandedRowContent;
        if (expandedRowRender && isRowExpanded) {
            expandedRowContent = expandedRowRender(record, index, indent);
        }
        const subVisible = visible && isRowExpanded;

        if (expandedRowContent && isRowExpanded) {
            rows.push(this.getExpandedRow(
                key, expandedRowContent, subVisible, expandedRowClassName(record, index, indent), fixed
            ));
        }
        if (childrenColumn) {
            rows = rows.concat(this.getRowsByData(
                childrenColumn, subVisible, indent + 1, columns, fixed
            ));
        }
    }

    /* eslint "prefer-const": 0 */
    getRowsByData(data, visible, indent, columns, fixed) {
        const props = this.props;
        const { childrenColumnName, expandedRowRender, expandedRowClassName,
                expandIconAsCell, expandIconColumnIndex } = props;
        let rows = [];
        const {needIndentSpaced,
                expandIconAsCellAdjusted,
                expandIconColumnIndexAdjusted} =
        this.getExpandedRelatedParam({
            childrenColumnName,
            data,
            fixed,
            expandIconAsCell,
            expandIconColumnIndex
        });

        for (let index = 0; index < data.length; index++) {
            const record = data[index];
            const isRowExpanded = this.isRowExpanded(record);
            const key = this.getRowKey(record, index);
            const childrenColumn = record[childrenColumnName];
            const options = {record, props, index, indent, fixed, needIndentSpaced, isRowExpanded,
                expandIconAsCellAdjusted, visible, expandIconColumnIndexAdjusted, key, childrenColumn};

            rows.push(this.createRow(options));

            this.concatExpandedAndChildRows({expandedRowRender, isRowExpanded, record, fixed, childrenColumn, columns,
                index, indent, visible, key, expandedRowClassName}, rows);
        }

        return rows;
    }

    getRows(columns, fixed) {
        return this.getRowsByData(this.props.defaultState.data, true, 0, columns, fixed);
    }

    getColGroup(columns, fixed) {
        let cols = [];
        if (this.props.expandIconAsCell && fixed !== "right") {
            cols.push(
                <col
                    className={`${this.props.prefixCls}-expand-icon-col`}
                    key="rc-table-expand-icon-col"
                />
            );
        }
        let leafColumns;
        if (fixed === "left") {
            leafColumns = this.columnManager.leftLeafColumns();
        } else if (fixed === "right") {
            leafColumns = this.columnManager.rightLeafColumns();
        } else {
            leafColumns = this.columnManager.leafColumns();
        }
        cols = cols.concat(leafColumns.map((c) => {
            return <col key={c.key} style={{ width: c.width, minWidth: c.width }} />;
        }));
        return <colgroup>{cols}</colgroup>;
    }

    getLeftFixedTable() {
        return this.getTable({
            columns: this.columnManager.leftColumns(),
            fixed: "left",
            leftFixedTableWidth: this.props.defaultState.leftFixedTableWidth
        });
    }

    getRightFixedTable() {
        return this.getTable({
            columns: this.columnManager.rightColumns(),
            fixed: "right"
        });
    }

    getTable(options = {}) {
        const { columns, fixed, leftFixedTableWidth, originalTableWidth } = options;
        const { prefixCls, scroll = {}, getBodyWrapper } = this.props;
        let { useFixedHeader } = this.props;
        const bodyStyle = Object.assign({}, this.props.bodyStyle);
        const headStyle = {};

        let tableClassName = "";

        const getBodyStyle = () => {
            if (scroll.x || fixed) {
                tableClassName = `${prefixCls}-fixed`;
                bodyStyle.overflowX = bodyStyle.overflowX || "auto";
            }

            const bodyStyleOfScrollY = () => {
                bodyStyle.overflowY = bodyStyle.overflowY || "scroll";
                bodyStyle.overflowX = "hidden";
                useFixedHeader = true;

                // Add negative margin bottom for scroll bar overflow bug
                const scrollbarWidth = measureScrollbar();
                if (scrollbarWidth > 0) {
                    (fixed ? bodyStyle : headStyle).marginBottom = "0px";//`-${scrollbarWidth}px`;
                    (fixed ? bodyStyle : headStyle).paddingBottom = "0px";
                    if (!fixed) {
                        headStyle.width = originalTableWidth;
                    }
                }

                // maxHeight will make fixed-Table scrolling not working
                // so we only set maxHeight to body-Table here
                if (fixed) {
                    bodyStyle.height = bodyStyle.height || scroll.y;
                } else {
                    bodyStyle.maxHeight = bodyStyle.maxHeight || scroll.y;
                    bodyStyle.width = originalTableWidth;
                }
            };

            if (scroll.y) {
                bodyStyleOfScrollY();
            }
        };

        getBodyStyle();

        const renderTable = (hasHead = true, hasBody = true) => {
            const tableStyle = {};
            if (!fixed && scroll.x) {
                // not set width, then use content fixed width
                if (scroll.x === true) {
                    tableStyle.tableLayout = "fixed";
                } else {
                    tableStyle.width = scroll.x;
                }
            }

            if (fixed && leftFixedTableWidth) {
                tableStyle.width = leftFixedTableWidth;
            }

            const tableBody = hasBody ? getBodyWrapper(
                <tbody ref = "rcHideTable" className={`${prefixCls}-tbody`} style =
                {{visibility: "hidden", display: "none", height: "1px", overflow: "hidden"}}>
                  {this.getRows(columns, fixed)}
                </tbody>
            ) : null;
            return (
                <table ref ={(fixed && leftFixedTableWidth) ? "leftFixedTable" : "" }
                    className={tableClassName} style={tableStyle}
                >
                  {this.getColGroup(columns, fixed)}
                  {hasHead ? this.getHeader(columns, fixed) : null}
                  {tableBody}
                </table>
            );
        };

        let headTable;

        if (useFixedHeader) {
            headTable = (
                <div
                    className={`${prefixCls}-header`}
                    ref={fixed ? null : "headTable"}
                    style={headStyle}
                >
                    {renderTable(true, false)}
                </div>
            );
        }

        const getBodyTable = () => {
            let BodyTable = (
              <div
                  className={`${prefixCls}-body`}
                  style={bodyStyle}
                  ref="bodyTable"
              >
                  {renderTable(!useFixedHeader)}
              </div>
            );

            if (fixed && columns.length) {
                let refName = columns[0].fixed === "left" || columns[0].fixed === true ?
                              "fixedColumnsBodyLeft" : "fixedColumnsBodyRight";
                delete bodyStyle.overflowX;
                delete bodyStyle.overflowY;
                const style = Object.assign({}, bodyStyle);
                BodyTable = (
                    <div
                        className={`${prefixCls}-body-outer`}
                        style={style}
                    >
                        <div
                            className={`${prefixCls}-body-inner`}
                            ref={refName}
                        >
                            {renderTable(!useFixedHeader)}
                        </div>
                    </div>
                );
            }

            return BodyTable;
        };

        const bodyTable = getBodyTable();

        return <span>{headTable}{bodyTable}</span>;
    }

    getTitle() {
        const { title, prefixCls } = this.props;
        return title ? (
            <div className={`${prefixCls}-title`}>
                {title(this.props.defaultState.data)}
            </div>
        ) : null;
    }

    getFooter() {
        const { footer, prefixCls } = this.props;
        return footer ? (
            <div className={`${prefixCls}-footer`}>
                {footer(this.props.defaultState.data)}
            </div>
        ) : null;
    }

    getEmptyText() {
        const { emptyText, prefixCls, data } = this.props;
        return !data.length ? (
            <div className={`${prefixCls}-placeholder`}>
                {emptyText()}
            </div>
        ) : null;
    }

    getHeaderRowStyle(columns, rows) {
        const { fixedColumnsHeadRowsHeight } = this.props.defaultState;
        const headerHeight = fixedColumnsHeadRowsHeight[0];
        if (headerHeight && columns) {
            if (headerHeight === "auto") {
                return { height: "auto" };
            }
            return { height: headerHeight / rows.length };
        }
        return null;
    }

    resetScrollY() {
        if (this.refs.headTable) {
            this.refs.headTable.scrollLeft = 0;
        }
        if (this.refs.bodyTable) {
            this.refs.bodyTable.scrollLeft = 0;
        }
    }

    findExpandedRow(record) {
        const rows = this.getExpandedRows().filter((i) => i === this.getRowKey(record));
        return rows[0];
    }

    isRowExpanded(record) {
        return typeof this.findExpandedRow(record) !== "undefined";
    }

    getScrollPanelStyle() {
        return {
            width: this.props.defaultState.fixedColumnsScrollableTableWidth,
            left: this.props.defaultState.fixedColumnsScrollableTableLeftPosition
        };
    }

    handleTableMouseDown(event) {
        this.props.onTableDown(event);
    }

    getClassName(props) {
        let className = props.prefixCls;

        if (props.className) {
            className += ` ${props.className}`;
        }
        if (props.useFixedHeader || (props.scroll && props.scroll.y)) {
            className += ` ${props.prefixCls}-fixed-header`;
        }
        className += ` ${props.prefixCls}-scroll-position-${this.props.defaultState.scrollPosition}`;

        if (this.props.defaultState.moveBegin) {
            className += ` drag`;
        }

        return className;
    }

    handleFixTableScroll(e) {
        this.props.onHeaderScroll(e, true);
    }

    handleTableScroll(event) {
        this.props.onHeaderWheel(event);
    }

    render() {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const className = this.getClassName(props);
        const isTableScroll = this.columnManager.isAnyColumnsFixed() || props.scroll.x || props.scroll.y;
        const scrollPanelStyle = this.getScrollPanelStyle();
        return (
            <div className={className} style={props.style} ref="rcTable" onWheel={this.handleTableScroll}>
                {this.getTitle()}
                <div className={`${prefixCls}-content`}>
                    {this.columnManager.isAnyColumnsLeftFixed() &&
                    <div ref="fixLeft" className={`${prefixCls}-fixed-left`}
                        style={{width: this.props.defaultState.leftFixedTableContainerWidth}}
                    >
                        {this.getLeftFixedTable()}
                        {props.enableColumnDraggable &&
                            <div>
                                <div onMouseDown = {this.handleTableMouseDown} className="split"
                                    style = {{height: props.height}}
                                ></div>
                                <div onMouseDown = {this.handleTableMouseDown} className="split_area"></div>
                            </div>
                        }
                    </div>}
                    <div ref = "tableWapper" className={isTableScroll ? `${prefixCls}-scroll` : ""}
                        style={scrollPanelStyle} onScroll={this.handleFixTableScroll}
                    >
                        {this.getTable({
                            columns: this.columnManager.groupedWithoutFixedColumns(),
                            originalTableWidth: this.props.defaultState.originalTableWidth
                        })}
                        {this.getEmptyText()}
                        {this.getFooter()}
                    </div>
                    {this.columnManager.isAnyColumnsRightFixed() &&
                    <div className={`${prefixCls}-fixed-right`}>
                        {this.getRightFixedTable()}
                    </div>}
                </div>
            </div>
        );
    }
}

FixTableHeader.propTypes = {
    data: PropTypes.array,
    expandIconAsCell: PropTypes.bool,
    defaultExpandAllRows: PropTypes.bool,
    expandedRowKeys: PropTypes.array,
    defaultExpandedRowKeys: PropTypes.array,
    useFixedHeader: PropTypes.bool,
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    bodyStyle: PropTypes.object,
    style: PropTypes.object,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowClassName: PropTypes.func,
    expandedRowClassName: PropTypes.func,
    childrenColumnName: PropTypes.string,
    onExpand: PropTypes.func,
    onExpandedRowsChange: PropTypes.func,
    indentSize: PropTypes.number,
    onRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    expandIconColumnIndex: PropTypes.number,
    showHeader: PropTypes.bool,
    title: PropTypes.func,
    footer: PropTypes.func,
    emptyText: PropTypes.func,
    scroll: PropTypes.object,
    rowRef: PropTypes.func,
    getBodyWrapper: PropTypes.func,
    children: PropTypes.node,
    sortColumns: PropTypes.array,
    sortOrder: PropTypes.func,
    onTableMove: PropTypes.func,
    onTableUp: PropTypes.func,
    onTableDown: PropTypes.func,
    onHeaderScroll: PropTypes.func,
    defaultState: PropTypes.object,
    height: PropTypes.number,
    onHeaderWheel: PropTypes.func
};

FixTableHeader.defaultProps = {
    data: [],
    useFixedHeader: false,
    expandIconAsCell: false,
    defaultExpandAllRows: false,
    defaultExpandedRowKeys: [],
    rowKey: "key",
    rowClassName: () => "",
    expandedRowClassName: () => "",
    onExpand() {},
    onExpandedRowsChange() {},
    onRowClick() {},
    onRowDoubleClick() {},
    prefixCls: "rc-table",
    bodyStyle: {},
    style: {},
    childrenColumnName: "children",
    indentSize: 15,
    expandIconColumnIndex: 0,
    showHeader: true,
    scroll: {},
    rowRef: () => null,
    getBodyWrapper: (body) => body,
    emptyText: () => "No Data",
    enableColumnDraggable: false,
    sortColumns: []
};

export default FixTableHeader;
