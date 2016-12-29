import React, { PropTypes, Component } from "react";
import * as ReactDOM from "react-dom";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { measureScrollbar, debounce } from "./utils";
import shallowequal from "./toRemove/shallowequal";
import addEventListener from "./toRemove/addEventListener";
import ColumnManager from "./ColumnManager";
import createStore from "./createStore";
import FixedTableHeader from "./FixedTableHeader";

class Table extends Component {
    constructor(props) {
        super(props);
        this.columnManager = new ColumnManager(props.columns, props.children);
        this.bindContext();
        this.store = createStore({ currentHoverKey: null });
        let expandedRowKeys = this.getExpandedRowKeys(props);
        this.tableHeaderHeight = -999;
        this.tableHeaderWith = "100%";
        this.tableHeaderScollLeft = 0;
        this.moveBegin = false;
        this.state = {
            expandedRowKeys,
            fixedTop: false,
            data: props.data,
            currentHoverKey: null,
            scrollPosition: "left",
            fixedColumnsHeadRowsHeight: [],
            fixedColumnsBodyRowsHeight: [],
            fixedColumnsScrollableTableLeftPosition: 0,
            fixedColumnsScrollableTableWidth: "100%",
            hasSetFixedColumnsScrollableTableWidth: false,
            leftFixedTableWidth: undefined,
            originalTableWidth: undefined,
            originalLeftFixedTableWidth: undefined,
            leftFixedTableContainerWidth: undefined
        };
    }

    getExpandedRowKeys(props) {
        let expandedRowKeys = [];
        let rows = [...props.data];
        if (props.defaultExpandAllRows) {
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                expandedRowKeys.push(this.getRowKey(row));
                rows = rows.concat(row[props.childrenColumnName] || []);
            }
        } else {
            expandedRowKeys = props.expandedRowKeys || props.defaultExpandedRowKeys;
        }
        return expandedRowKeys;
    }

    bindContext() {
        this.handleRowHover = this.handleRowHover.bind(this);
        this.handleTableMouseDown = this.handleTableMouseDown.bind(this);
        this.handleTableMouseUp = this.handleTableMouseUp.bind(this);
        this.handleTableMouseMove = this.handleTableMouseMove.bind(this);
        this.syncFixedTableRowHeight = this.syncFixedTableRowHeight.bind(this);
        this.syncFixedTableHeader = this.syncFixedTableHeader.bind(this);
        this.handleBodyScroll = this.handleBodyScroll.bind(this);
        this.handleDetectScrollTarget = this.handleDetectScrollTarget.bind(this);
        this.handleFixTableScroll = this.handleFixTableScroll.bind(this);
        this.handleRowDestroy = this.handleRowDestroy.bind(this);
        this.handleExpanded = this.handleExpanded.bind(this);
        this.handleHeaderWheel = this.handleHeaderWheel.bind(this);
    }

    componentDidMount() {
        this.resetScrollY();
        this.tableHeaderHeight = this.refs.tableHeader ?
        ReactDOM.findDOMNode(this.refs.tableHeader).getBoundingClientRect().height : 0;
        this.tableHeaderWith = this.refs.rcTable ?
        ReactDOM.findDOMNode(this.refs.rcTable).getBoundingClientRect().width : "100%";
        this.tableHeaderScollLeft = 0;
        if (this.columnManager.isAnyColumnsFixed()) {
            this.syncFixedTableRowHeight();
            const resizeEventWait = 150;
            this.resizeEvent = addEventListener(
                window, "resize", debounce(this.syncFixedTableRowHeight, resizeEventWait)
            );
        }

        const scrollEventWait = 10;
        const scrollObj = document.getElementById(this.props.wrapperScrollBarIdName) ||
            document.getElementsByClassName("neptune_navContent_1ge5r")[0];
        this.scrollEvent = addEventListener(
            scrollObj, "scroll", debounce(this.syncFixedTableHeader, scrollEventWait)
        );
    }

    componentWillReceiveProps(nextProps) {
        if ("data" in nextProps) {
            this.setState({
                data: nextProps.data
            });
            if (!nextProps.data || nextProps.data.length === 0) {
                this.resetScrollY();
            }
        }
        if ("expandedRowKeys" in nextProps) {
            this.setState({
                expandedRowKeys: nextProps.expandedRowKeys
            });
        }
        if (nextProps.columns && nextProps.columns !== this.props.columns) {
            this.columnManager.reset(nextProps.columns);
        } else if (nextProps.children !== this.props.children) {
            this.columnManager.reset(null, nextProps.children);
        }
    }

    componentDidUpdate() {
        this.syncFixedTableRowHeight();
    }

    componentWillUnmount() {
        if (this.resizeEvent) {
            this.resizeEvent.remove();
        }
        if (this.scrollEvent) {
            this.scrollEvent.remove();
        }
    }

    onExpandedRowsChange(expandedRowKeys) {
        if (!this.props.expandedRowKeys) {
            this.setState({ expandedRowKeys });
        }
        this.props.onExpandedRowsChange(expandedRowKeys);
    }

    handleExpanded(expanded, record, e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const info = this.findExpandedRow(record);
        if (typeof info !== "undefined" && !expanded) {
            this.handleRowDestroy(record);
        } else if (!info && expanded) {
            const expandedRows = this.getExpandedRows().concat();
            expandedRows.push(this.getRowKey(record));
            this.onExpandedRowsChange(expandedRows);
        }
        this.props.onExpand(expanded, record);
    }

    handleRowDestroy(record) {
        const expandedRows = this.getExpandedRows().concat();
        const rowKey = this.getRowKey(record);
        const notExistIndex = -1;
        let index = -1;
        expandedRows.forEach((r, i) => {
            if (r === rowKey) {
                index = i;
            }
        });
        if (index !== notExistIndex) {
            expandedRows.splice(index, 1);
        }
        this.onExpandedRowsChange(expandedRows);
    }

    getRowKey(record, index) {
        const rowKey = this.props.rowKey;
        if (typeof rowKey === "function") {
            return rowKey(record, index);
        }
        return typeof record[rowKey] !== "undefined" ? record[rowKey] : index;
    }

    getExpandedRows() {
        return this.props.expandedRowKeys || this.state.expandedRowKeys;
    }

    getHeader(columns, fixed) {
        const { showHeader, expandIconAsCell, prefixCls, sortColumns, sortOrder} = this.props;
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
        const tableHeaderRef = fixed ? `tableHeader${fixed}` : "tableHeader";
        return showHeader ? (
            <TableHeader
                ref = {tableHeaderRef}
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
                expandIconAsCellAdjusted, visible, expandIconColumnIndexAdjusted, key, childrenColumn} = options;
        const { childrenColumnName, expandedRowRender, expandRowByClick,
                rowClassName, rowRef, onRowClick, onRowDoubleClick } = props;
        const { fixedColumnsBodyRowsHeight } = this.state;
        const className = rowClassName(record, index, indent);

        const onHoverProps = {};
        if (this.columnManager.isAnyColumnsFixed()) {
            onHoverProps.onHover = this.handleRowHover;
        }

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
              expandIconAsCell={expandIconAsCellAdjusted}
              onDestroy={this.handleRowDestroy}
              index={index}
              visible={visible}
              expandRowByClick={expandRowByClick}
              onExpand={this.handleExpanded}
              expandable={childrenColumn || expandedRowRender}
              expanded={isRowExpanded}
              prefixCls={`${props.prefixCls}-row`}
              childrenColumnName={childrenColumnName}
              columns={leafColumns}
              expandIconColumnIndex={expandIconColumnIndexAdjusted}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              height={height}
              {...onHoverProps}
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

    /* eslint "prefer-const": 0 */
    /* eslint "max-statements": 0 */
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

        return rows;
    }

    getRows(columns, fixed) {
        return this.getRowsByData(this.state.data, true, 0, columns, fixed);
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
            leftFixedTableWidth: this.state.leftFixedTableWidth
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
                <tbody className={`${prefixCls}-tbody`}>
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
                    onMouseOver={this.handleDetectScrollTarget}
                    onTouchStart={this.handleDetectScrollTarget}
                    onScroll={this.handleBodyScroll}
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
                  onMouseOver={this.handleDetectScrollTarget}
                  onTouchStart={this.handleDetectScrollTarget}
                  onScroll={this.handleBodyScroll}
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
                            onMouseOver={this.handleDetectScrollTarget}
                            onTouchStart={this.handleDetectScrollTarget}
                            onScroll={this.handleBodyScroll}
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
                {title(this.state.data)}
            </div>
        ) : null;
    }

    getFooter() {
        const { footer, prefixCls } = this.props;
        return footer ? (
            <div className={`${prefixCls}-footer`}>
                {footer(this.state.data)}
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
        const { fixedColumnsHeadRowsHeight } = this.state;
        const headerHeight = fixedColumnsHeadRowsHeight[0];
        if (headerHeight && columns) {
            if (headerHeight === "auto") {
                return { height: "auto" };
            }
            return { height: headerHeight / rows.length };
        }
        return null;
    }

    syncFixedTableRowHeight() {
        const { prefixCls } = this.props;
        const headRows = this.refs.headTable ?
                this.refs.headTable.querySelectorAll("thead") :
                this.refs.bodyTable.querySelectorAll("thead");
        const bodyRows = this.refs.bodyTable.querySelectorAll(`.${prefixCls}-row`) || [];
        const fixedColumnsHeadRowsHeight = [].map.call(
            headRows, (row) => {
                return row.getBoundingClientRect().height || "auto";
            }
        );
        const fixedColumnsBodyRowsHeight = [].map.call(
            bodyRows, (row) => {
                if (row.getBoundingClientRect().height < 51) {
                    row.style.height = "51px";
                }
                return row.getBoundingClientRect().height || "auto";
            }
        );
        if (shallowequal(this.state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) &&
            shallowequal(this.state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
            return;
        }

        if (!this.state.hasSetFixedColumnsScrollableTableWidth) {
            const scrollTableBody = this.refs.bodyTable.parentElement.parentElement;
            const tableWidth = this.refs.bodyTable.children[0].clientWidth;
            const leftFixedColumnWidth = this.refs.fixedColumnsBodyLeft ?
                                          this.refs.fixedColumnsBodyLeft.offsetWidth : 0;
            const rightFixedColumnWidth = this.refs.fixedColumnsBodyRight ?
                                            this.refs.fixedColumnsBodyRight.clientWidth : 0;
            const width = scrollTableBody.clientWidth - leftFixedColumnWidth - rightFixedColumnWidth;

            this.originalLeftFixedTableWidth = leftFixedColumnWidth;
            this.fixedColumnsScrollableTableWidth = width;
            this.leftFixedTableWidth = leftFixedColumnWidth;
            this.leftFixedTableContainerWidth = this.state.leftFixedTableContainerWidth;
            this.fixedColumnsScrollableTableLeftPosition = leftFixedColumnWidth;

            this.setState({
                fixedColumnsHeadRowsHeight,
                fixedColumnsBodyRowsHeight,
                hasSetFixedColumnsScrollableTableWidth: true,
                leftFixedTableWidth: leftFixedColumnWidth,
                fixedColumnsScrollableTableLeftPosition: leftFixedColumnWidth,
                fixedColumnsScrollableTableWidth: width,
                originalTableWidth: tableWidth,
                originalLeftFixedTableWidth: leftFixedColumnWidth
            });
        } else {
            this.setState({
                fixedColumnsHeadRowsHeight,
                fixedColumnsBodyRowsHeight
            });
        }
    }

    syncFixedTableHeader(event) {
        const { rcTable, hideTableHeader } = this.refs;
        const offsetTop = this.state.rcTableOffsetTop ? this.state.rcTableOffsetTop : rcTable.offsetTop;
        const prefixCls = this.props.prefixCls;
        if (offsetTop <= (event.target.scrollTop) && event.target.className !== `${prefixCls}-scroll`) {
            if ((offsetTop + rcTable.getBoundingClientRect().height - this.tableHeaderHeight)
                <= event.target.scrollTop) {
                hideTableHeader.refs.rcTable.style.display = "none";
            } else if (hideTableHeader.refs.rcTable.style.display !== "") {
                hideTableHeader.refs.rcTable.style.display = "";
                hideTableHeader.refs.rcTable.style.height = `${this.tableHeaderHeight}px`;
                hideTableHeader.refs.rcTable.style.width = this.tableHeaderWith === "100%" ?
                this.tableHeaderWith : `${this.tableHeaderWith}px`;
                hideTableHeader.refs.rcTable.style.left = `${this.refs.rcTable.getClientRects()[0].left}px`;
                hideTableHeader.refs.tableWapper.scrollLeft = this.tableHeaderScollLeft;
            } else {
                return;
            }
        } else if (hideTableHeader.refs.rcTable.style.display === ""
            && event.target.className !== `${prefixCls}-scroll`) {
            hideTableHeader.refs.rcTable.style.display = "none";
        } else if (event.target.className === `${prefixCls}-scroll`) {
            // this.handleBodyScroll(event);
        } else {
            return;
        }
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

    handleDetectScrollTarget(e) {
        if (this.scrollTarget !== e.currentTarget) {
            this.scrollTarget = e.currentTarget;
        }
    }

    setBodyScrollY(e, fixedColumnsBodyLeft, fixedColumnsBodyRight, bodyTable) {
        if (fixedColumnsBodyLeft && e.target !== fixedColumnsBodyLeft) {
            fixedColumnsBodyLeft.scrollTop = e.target.scrollTop;
        }
        if (fixedColumnsBodyRight && e.target !== fixedColumnsBodyRight) {
            fixedColumnsBodyRight.scrollTop = e.target.scrollTop;
        }
        if (bodyTable && e.target !== bodyTable) {
            bodyTable.scrollTop = e.target.scrollTop;
        }
    }

    handleBodyScroll(e) {
        if (e.target !== this.scrollTarget) {
            return;
        }
        const { scroll = {} } = this.props;
        const { bodyTable, fixedColumnsBodyLeft, fixedColumnsBodyRight } = this.refs;
        if (scroll.y) {
            this.setBodyScrollY(e, fixedColumnsBodyLeft, fixedColumnsBodyRight, bodyTable);
        }
        // Remember last scrollLeft for scroll direction detecting.
        this.lastScrollLeft = e.target.scrollLeft;
    }

    handleFixTableScroll(e, isFromFixHeader) {
        if (this.tableHeaderScollLeft !== e.target.scrollLeft) {
            this.tableHeaderScollLeft = e.target.scrollLeft;
            if (!isFromFixHeader) {
                ReactDOM.findDOMNode(this.refs.hideTableHeader.refs.tableWapper).scrollLeft = e.target.scrollLeft;
            } else {
                ReactDOM.findDOMNode(this.refs.tableWapper).scrollLeft = e.target.scrollLeft;
            }
        }
    }

    handleRowHover(isHover, key) {
        this.store.setState({
            currentHoverKey: isHover ? key : null
        });
    }

    getScrollPanelStyle() {
        return {
            width: this.state.fixedColumnsScrollableTableWidth,
            left: this.state.fixedColumnsScrollableTableLeftPosition
        };
    }

    handleTableMouseDown(event) {
        this.moveBegin = true;
        this.refs.hideTableHeader.refs.tableWapper.scrollLeft = this.tableHeaderScollLeft;
        this.refs.rcTableDragbar.style.left = `${event.clientX - this.refs.rcTable.getClientRects()[0].left}px`;
        this.refs.rcTable.className = this.getClassName(this.props);
    }

    handleTableMouseUp(event) {
        this.updateDraggedWidth(event.clientX - this.refs.rcTable.getClientRects()[0].left);
    }

    handleTableMouseMove(event) {
        if (this.moveBegin) {
            this.refs.rcTableDragbar.style.left = `${event.clientX - this.refs.rcTable.getClientRects()[0].left}px`;
        }
    }

    updateDraggedWidth(width) {
        if (this.moveBegin) {
            this.moveBegin = false;
            this.refs.rcTableDragbar.style.left = `-9999px`;
            this.refs.rcTable.className = this.getClassName(this.props);

            const moveLeft = width <= this.fixedColumnsScrollableTableLeftPosition;
            const stateObj = {
                leftFixedTableContainerWidth: width, // 4
                fixedColumnsScrollableTableLeftPosition: width  // 5
            };

            if (moveLeft) {
                const scrollableTableWidth = this.leftFixedTableContainerWidth
                                              ? (this.leftFixedTableContainerWidth - width)
                                              : (this.leftFixedTableWidth - width);
                stateObj.fixedColumnsScrollableTableWidth =
                    this.fixedColumnsScrollableTableWidth + scrollableTableWidth; // 2
                stateObj.leftFixedTableWidth =
                    width < this.originalLeftFixedTableWidth ? this.originalLeftFixedTableWidth : width; //3
            } else {
                if (width > this.leftFixedTableWidth) {
                    stateObj.leftFixedTableWidth = width; // 3
                }

                const scrollableTableWidth = this.leftFixedTableContainerWidth
                                              ? (width - this.leftFixedTableContainerWidth)
                                              : (width - this.leftFixedTableWidth);
                stateObj.fixedColumnsScrollableTableWidth =
                    this.fixedColumnsScrollableTableWidth - scrollableTableWidth; // 2
            }
            // this.setState(stateObj);
            this.updateDraggedWidthToTable(stateObj);
            this.refs.tableWapper.style.width = `${stateObj.fixedColumnsScrollableTableWidth}px`; // 2
            this.refs.hideTableHeader.refs.tableWapper.style.width =
                `${stateObj.fixedColumnsScrollableTableWidth}px`;//2
            this.refs.leftFixedTable.style.width = `${stateObj.leftFixedTableWidth}px`; // 3
            this.refs.hideTableHeader.refs.leftFixedTable.style.width = `${stateObj.leftFixedTableWidth}px`; // 3

            this.refs.fixLeft.style.width = `${stateObj.leftFixedTableContainerWidth}px`; // 4
            this.refs.hideTableHeader.refs.fixLeft.style.width = `${stateObj.leftFixedTableContainerWidth}px`; // 4

            this.refs.hideTableHeader.refs.tableWapper.style.left =
            `${this.fixedColumnsScrollableTableLeftPosition}px`; //5
            this.refs.tableWapper.style.left = `${this.fixedColumnsScrollableTableLeftPosition}px`; // 5
        }
    }

    updateDraggedWidthToTable(stateObj) {
        this.fixedColumnsScrollableTableWidth = stateObj.fixedColumnsScrollableTableWidth;
        this.leftFixedTableWidth = stateObj.leftFixedTableWidth;
        this.leftFixedTableContainerWidth = stateObj.leftFixedTableContainerWidth;
        this.fixedColumnsScrollableTableLeftPosition = stateObj.fixedColumnsScrollableTableLeftPosition;
    }

    getClassName(props) {
        let className = props.prefixCls;

        if (props.className) {
            className += ` ${props.className}`;
        }
        if (props.useFixedHeader || (props.scroll && props.scroll.y)) {
            className += ` ${props.prefixCls}-fixed-header`;
        }
        className += ` ${props.prefixCls}-scroll-position-${this.state.scrollPosition}`;

        if (this.moveBegin) {
            className += ` drag`;
        }

        return className;
    }
    handleHeaderWheel(event) {
        const scrollObj = document.getElementById(this.props.wrapperScrollBarIdName) ||
            document.getElementsByClassName("neptune_navContent_1ge5r")[0];
        scrollObj.scrollTop += event.deltaY;
    }
    getFixTopHeader() {
        const props = this.props;
        return (<FixedTableHeader ref = "hideTableHeader" {...props}
            onTableMove = {this.handleTableMouseMove}
            onTableUp = {this.handleTableMouseUp}
            onTableDown = {this.handleTableMouseDown}
            onHeaderScroll = {this.handleFixTableScroll}
            onHeaderWheel = {this.handleHeaderWheel}
            defaultState = {this.state}
            height = {this.tableHeaderHeight}
            style = {{display: this.state.fixedTop ? "" : "none",
                    position: "fixed",
                    top: 89,
                    left: this.refs.rcTable ? this.refs.rcTable.getClientRects()[0].left : "-999px",
                    zIndex: 9,
                    width: this.tableHeaderWith,
                    height: this.tableHeaderHeight}}
                />
        );
    }

    render() {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const className = this.getClassName(props);
        const isTableScroll = this.columnManager.isAnyColumnsFixed() || props.scroll.x || props.scroll.y;
        const scrollPanelStyle = this.getScrollPanelStyle();

        return (
            <div className={className} style={props.style} ref="rcTable"
                onMouseMove = {this.handleTableMouseMove} onMouseUp = {this.handleTableMouseUp}
            >
                {this.getTitle()}
                {props.enableTableFixTop && this.getFixTopHeader()}
                <div className={`${prefixCls}-content`}>
                    {this.columnManager.isAnyColumnsLeftFixed() &&
                    <div ref="fixLeft" className={`${prefixCls}-fixed-left`}
                        style={{width: this.state.leftFixedTableContainerWidth}}
                    >
                        {this.getLeftFixedTable()}
                        {props.enableColumnDraggable &&
                            <div>
                                <div onMouseDown = {this.handleTableMouseDown}
                                    className="split" style = {{height: this.tableHeaderHeight + 1}}
                                ></div>
                                <div onMouseDown = {this.handleTableMouseDown} className="split_area"></div>
                                <div className = "scroll_blank"></div>
                            </div>
                        }
                    </div>}
                    <div ref = "tableWapper" className={isTableScroll ? `${prefixCls}-scroll` : ""}
                        style={scrollPanelStyle} onScroll={this.handleFixTableScroll}
                    >
                        {this.getTable({
                            columns: this.columnManager.groupedWithoutFixedColumns(),
                            originalTableWidth: this.state.originalTableWidth
                        })}
                        {this.getEmptyText()}
                        {this.getFooter()}
                    </div>
                    {this.columnManager.isAnyColumnsRightFixed() &&
                    <div className={`${prefixCls}-fixed-right`}>
                        {this.getRightFixedTable()}
                    </div>}
                     {props.enableColumnDraggable &&
                        <div>
                            <div ref="rcTableDragbar" className= "x-grid-resize-marker"></div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Table.propTypes = {
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
    enableColumnDraggable: PropTypes.bool,
    wrapperScrollBarIdName: PropTypes.string,
    enableTableFixTop: PropTypes.bool,
    sortColumns: PropTypes.array,
    sortOrder: PropTypes.func
};

Table.defaultProps = {
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
    wrapperScrollBarIdName: "",
    enableTableFixTop: true,
    sortColumns: []
};

export default Table;
