/* eslint-disable */
const $ = require('jquery');
const dataTables = require('datatables.net');
const dataTablesFixedColumns = require('datatables.net-fixedcolumns');
const dataTablesFixedHeader = require('datatables.net-fixedheader');
const dataTablesScroller = require('datatables.net-scroller');
const Draggable = require('./draggable').default;
const FixedHeader = require('./FixedHeader').default;
const RowGrouping = require('./RowGrouping').default;
const _ = require('lodash');
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * This class wraps the DataTables.net table component. The idea is to not directly expose DataTables to consumers, so
 * later on if decide to swap out a different table component, the consumer facing API does not have to change.
 */
export default class DataTableWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.nodes = []; //collection of react nodes we render into cells.
    }
    componentDidMount() {
        this.initialize();
        if (this.props.isScrollTable) {
            //Added because SZ change below is breaking our code!!
            //PLEASE add new code only conditionally.
            this.insertGroupTagAttr(this);
        }
    }
    componentWillUnmount() {
        this.destroy(true);
        $(window).off('scroll');
        $(window).off('resize');
        $(window).off('click');
        $('div.dataTables_scrollBody').off('scroll');
    }
    getTableDomNode() {
        if (!this.mainTable) {
            var node = ReactDOM.findDOMNode(this);
            this.mainTable = $(node).children().first();
        }
        return this.mainTable;
    }
    render() {
        return <div ref="tableNode" className="neptuneTable" style={{ position: 'relative' }}></div>;
    }
    insertGroupTagAttr(component) {
        const $tableDomNode = $(this.getTableDomNode());
        let groupStr = $tableDomNode.find('.content .group:first').text();
        $tableDomNode.on('draw.dt', function () {
            $('.content tr').each(function () {
                let ll = $(this).prev('.group').text().toString();
                if (ll != '' && ll != groupStr) {
                    groupStr = ll;
                }
                $(this).attr('group', groupStr);
            });
            if (component.props.removeFirstGroupRow) {
                let initialGroupStr = $('.content .group').first().attr('group');
                let groupHeadrs = $('.group').each(function () {
                    if ($(this).attr('group') == initialGroupStr) {
                        $(this).hide();
                    }
                });
            }
        });
    }
    initialize() {
        const options = Object.assign({ ajax: this.props.dataSource }, this.props);
        const { columns } = this.props;
        var flatCols = [];
        var hasGroupedColumns = false, optionsColDefs = [];
        if (columns.length == 0) {
            return;
        }
        if (this._initialized) {
            this.destroy();
        }
        columns.map(col => {
            if (col.children && col.children.length > 0) {
                flatCols = flatCols.concat(col.children);
                hasGroupedColumns = true;
            }
            else {
                flatCols.push(col);
            }
        });
        //Initialize default widths.
        flatCols.map(col => {
            if (!col.width) {
                col.width = "200px";
            }
        });
        //DataTables need a table HTML rendered to initialize the columns. In this call, we do that.
        this.setColumns(columns, hasGroupedColumns);
        //This is the dom element (the table component)
        const $tableDomNode = $(this.getTableDomNode());
        options.flatCols = flatCols;
        delete options["columns"]; //we dont want to initialize from the columns object, we use the 
        //HTML to render. This is because API columns do not have support for column groups.
        if (this.props.leftLockedCount > 0) {
            if (this.props.rowGroupingField) {
            }
            else {
                options.fixedColumns = {
                    leftColumns: this.props.leftLockedCount
                };
            }
        }
        //simple option mapping.
        options.pageLength = this.props.pageLength;
        options.paging = this.props.enablePaging;
        options.searching = this.props.enableSearch;
        options.bInfo = this.props.enableShowTotalCount;
        if (this.props.enableDeferRender) {
            options.deferRender = true;
        }
        //setup scrolling options.
        const isHorizontalScroll = this.props.enableScroll || this.props.enableHorizontalScroll || (this.props.leftLockedCount > 0);
        const isVerticalScroll = this.props.enableScroll || this.props.enableVerticalScroll;
        if (isHorizontalScroll) {
            options.scrollX = "100%";
            let columnWidth = 0;
            for (let i = 0; i < columns.length; i++) {
                if (i > 0) {
                    if (columns[i].children && columns[i].children.length > 0) {
                        for (let j = 0; j < columns[i].children.length; j++) {
                            if (!columns[i].children[j].width) {
                                continue;
                            }
                            if (columns[i].children[j].width.indexOf("px") !== -1) {
                                columnWidth += Number.parseInt(columns[i].children[j].width.replace("px", ""));
                            }
                            else {
                                columnWidth += columns[i].children[j].width;
                            }
                        }
                    }
                    else {
                        if (!columns[i].width) {
                            continue;
                        }
                        if (columns[i].width.indexOf("px") !== -1) {
                            columnWidth += Number.parseInt(columns[i].width.replace("px", ""));
                        }
                        else {
                            columnWidth += columns[i].width;
                        }
                    }
                }
            }
            options.scrollXInner = columnWidth + "px";
            options.scrollCollapse = true;
        }
        if (isVerticalScroll) {
            options.scrollY = this.props.height;
            options.scrollCollapse = true;
        }
        //row grouping involves setting up sorting, figuring out the colspans, and 
        //embedding trs and tds with appropriate colspans. 
        if (this.props.rowGroupingField) {
            this.rowGrouping = new RowGrouping(this, options, flatCols, optionsColDefs);
        }
        this.initializeDefaultSort(options, flatCols);
        //wire up cellHtmlCallback and cellRenderedCallback.
        flatCols.map(col => {
            if (col.cellHtmlCallback) {
                optionsColDefs.push({
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    "render": function (data, type, row, meta) {
                        return this.cellHtmlCallback(data, type, row, meta, this);
                    }.bind(col),
                    "targets": flatCols.indexOf(col)
                });
            }
            if (col.hidden) {
                optionsColDefs.push({ "visible": false, "targets": flatCols.indexOf(col) }); //hide the grouping column
            }
            if (col.className) {
                optionsColDefs.push({ "className": col.className, "targets": flatCols.indexOf(col) }); //set the className, if any
            }
            if (col.sortField) {
                const sortField = col.sortField;
                //figure out how many inner columns
                const sortCol = $.grep(flatCols, function (e) { return (e.title || e.dataField) == sortField; });
                const sortIndex = flatCols.indexOf(sortCol[0]);
                optionsColDefs.push({ "orderData": [sortIndex], "targets": flatCols.indexOf(col) });
                optionsColDefs.push({ "visible": false, "targets": sortIndex }); //hide the sort column
            }
            if (col.cellRenderedCallback) {
                var callBack = col.cellRenderedCallback;
                optionsColDefs.push({
                    "createdCell": (td, cellData, rowData, row, col) => {
                        callBack(td, cellData, rowData, row, col);
                    },
                    "targets": flatCols.indexOf(col)
                });
            }
            if (col.type) {
                optionsColDefs.push({ "type": col.type, "targets": flatCols.indexOf(col) });
                if (col.type == "num") {
                    optionsColDefs.push({
                        // The `data` parameter refers to the data for the cell (defined by the
                        // `data` option, which defaults to the column being worked with, in
                        // this case `data: 0`.
                        "render": function (data, type, row, meta) {
                            if (type == "sort") {
                                return isNaN(data) ? "" : parseFloat(data);
                            }
                            return data;
                        }.bind(col),
                        "targets": flatCols.indexOf(col)
                    });
                }
            }
            optionsColDefs.push({ "width": col.width, "targets": flatCols.indexOf(col) });
            optionsColDefs.push({ "orderable": this.props.enableOrdering && !col.disableSort, "targets": flatCols.indexOf(col) });
        });
        if (optionsColDefs.length > 0) {
            options.columnDefs = optionsColDefs;
        }
        //wire up rowCreatedCallback
        options.rowCallback = (row, data, index) => {
            if (this.props.rowCreatedCallback) {
                this.props.rowCreatedCallback(row, data, index);
            }
        };
        if (!$.fn.DataTable) {
            dataTables(window, $);
            dataTablesFixedColumns(window, $);
            dataTablesFixedHeader(window, $);
            dataTablesScroller(window, $);
        }
        if (!$.fn.scrollParent) {
            Draggable.register();
        }
        options.autoWidth = false; //dont try to figure out widths, we will enforce them.
        options.orderCellsTop = false;
        if (this.props.enableFixedHeader) {
            this.fixedHeader = new FixedHeader(this, options);
        }
        //Wire up headerCreatedCallback
        options.headerCallback = (thead, data, start, end, display) => {
            if (this.props.headerCreatedCallback) {
                this.props.headerCreatedCallback(thead, data, start, end, display);
            }
        };
        const table = $tableDomNode.DataTable(options); // eslint-disable-line new-cap
        if (this.props.isScrollTable) {
            $('div.dataTables_scrollBody').scroll(function () {
                $('.floatingRow').eq(1).scrollLeft($('div.dataTables_scrollBody').scrollLeft());
                setTimeout(function () {
                    $('.neptuneTable').eq(0).find('table tbody')
                        .css('overflow', 'hidden').css('display', 'block')
                        .scrollTop($('div.dataTables_scrollBody').scrollTop())
                        .find('tr td').eq(0).css('width', '220px');
                }, 1);
                // $(".dataTables_scrollHead").css('margin-left', '-1px');
                $('.neptuneTable').eq(1).find("tr.group td").html("");
                //$('.floatingRow').scrollLeft(parseInt($('div.dataTables_scrollBody').scrollTop()));
            });
        }
        var cellClickCallback = this.props.cellClickCallback;
        var onColumnSortCallback = this.props.onColumnSortCallback;
        this.dataTable = $tableDomNode.dataTable();
        this.DataTable = table;
        this.pendingPage = -1;
        var that = this;
        if (this.props.isLoading) {
            $tableDomNode.prepend("<div class='ajaxLoader'><img src='/dist/img/SpinnerMedium.gif'></div>");
        }
        $tableDomNode.on('click', 'th', function () {
            if (that.pendingPage > -1) {
                var pendingPage = that.pendingPage;
                table.page(pendingPage).draw(false);
            }
        });
        $tableDomNode.on('page.dt', function () {
            var pgInfo = table.page.info();
            that.pendingPage = pgInfo.page;
        });
        $tableDomNode.on('click', 'th', function () {
            if (onColumnSortCallback) {
                var colIndex = table.column(this)[0][0];
                onColumnSortCallback(colIndex);
            }
        });
        if (cellClickCallback) {
            $tableDomNode.on('click', 'td', function () {
                var data = table.cell(this).data(); //td element data  
                var rowIndex = table.row(this).index(); // Row index
                var colIndex = table.cell(this).index().columnVisible; //visble column index
                if (cellClickCallback) {
                    cellClickCallback(this, data, rowIndex, colIndex);
                }
            });
        }
        this._initialized = true;
        //remove data-react-id on the cloned table components otherwise react chokes.
        if (this.props.leftLockedCount > 0 || this.props.isScrollTable) {
            var root = $tableDomNode.closest('.dataTables_wrapper');
            root.width(this.props.width);
            var cloned = root.find('.DTFC_Cloned');
            cloned.each((idx, el) => {
                $(el).removeAttr('data-reactid');
            });
            Draggable.initializeDraggableHandle(this, table);
        }
    }
    initializeDefaultSort(options, flatCols) {
        let defaultSortcolIndexes;
        // SH - ROWGROUPING orderFixed takes care of this.
        // if (this.props.rowGroupingField) {
        //     const dataField = this.props.rowGroupingField;
        //     const matchCol = $.grep(flatCols, function (e) { return (e.title || e.dataField) == dataField; });
        //     const colIndex = flatCols.indexOf(matchCol[0]);
        //     options.order = [[colIndex, 'asc']];
        // } else {
        // }
        options.order = [];
        if (Array.isArray(options.defaultSortField)) {
            const defaultSortCol = options.defaultSortField.map((defaultSortField) => {
                return flatCols.filter((flatcol) => {
                    return (flatcol.headerText || flatcol.dataField) == defaultSortField;
                })[0];
            });
            defaultSortcolIndexes = defaultSortCol.map((cul) => { return [flatCols.indexOf(cul), "asc"]; });
            options.order = options.order.concat(defaultSortcolIndexes);
        }
        else if (typeof options.defaultSortField === "string" || options.defaultSortField instanceof String) {
            const defaultSortCol = flatCols.filter((flatcol) => {
                return (flatcol.title || flatcol.dataField) == options.defaultSortField;
            })[0];
            defaultSortcolIndexes = [[flatCols.indexOf(defaultSortCol), "asc"]];
            options.order = options.order.concat(defaultSortcolIndexes);
        }
    }
    rebuildFloatingHeader() {
        const $tableDomNode = $(this.getTableDomNode());
        const scroller = $tableDomNode.scrollParent();
        this.$floater.html("");
        scroller.trigger("scroll");
    }
    adjustColumns() {
        $(window).trigger('resize');
        const dataTable = this.dataTable;
        this.DataTable.columns.adjust();
        dataTable.fnAdjustColumnSizing();
    }
    visibleColumns(cols, visible) {
        const dataTable = this.dataTable;
        try {
            this.DataTable.columns(cols).visible(visible);
        }
        catch (error) {
        }
        dataTable.fnAdjustColumnSizing();
    }
    getDataTable() {
        return this.DataTable;
    }
    destroy() {
        if (this._initialized) {
            this.unmountAll();
            const table = $(this.getTableDomNode()).DataTable(); // eslint-disable-line new-cap
            table.destroy();
            this._initialized = false;
        }
    }
    unmountAll() {
        if (this.nodes.length === 0) {
            return;
        }
        this.nodes.forEach(node => {
            if (_.isFunction(React.unmountComponentAtNode)) {
                React.unmountComponentAtNode(node);
            }
        });
        this.nodes = [];
    }
    renderIntoNode(element, container, callback) {
        const renderedComponent = ReactDOM.render(element, container, callback);
        this.nodes.push(container);
        return renderedComponent;
    }
    //start table methods
    setDataArray(data) {
        this.dataTable.fnClearTable();
        this.dataTable.fnAddData(data);
        this.dataTable.fnDraw();
    }
    /**
     * This method will set the columns of the data table. Please note that this will actually
     * destroy and recreate the underlying datatable instance because the third party component we
     * are using does not support dynamic generations of columns.
     */
    setColumns(columns, hasGroupedColumns) {
        //as per current wireframes, max level of grouping we have is 2. 
        var firstLevelColumns = [];
        var zeroLevelColumns = [];
        var secondLevelColumns = [];
        var firstRow = "";
        var zerothRow = "";
        var phatomRow = "<tr style='position: absolute !important;top: -9999px !important;left: -9999px !important;border-style: hidden'>";
        if (hasGroupedColumns) {
            firstRow = "<tr>";
            columns.map(function (col) {
                firstLevelColumns.push(col);
                if (col.hasOwnProperty('children')) {
                    secondLevelColumns = secondLevelColumns.concat(col.children);
                }
                if (col.hasOwnProperty('categoryText')) {
                    zeroLevelColumns = zeroLevelColumns.concat(col);
                }
            });
            if (zeroLevelColumns.length > 0) {
                //border-collapse: collapse;   border-top: 2px solid #e5e5e5;
                zerothRow = "<tr style='height:17px;' class = 'zerothRow'><th ></th>";
                if (firstLevelColumns[1].headerText === "category") {
                    phatomRow += "<th rowspan=\"4\" >category</th>";
                }
                var groupedCategory = _.groupBy(zeroLevelColumns, (col) => { return col.categoryText; });
                _.forOwn(groupedCategory, function (cols, key) {
                    var colSpans = 0;
                    colSpans = _.reduce(cols, function (colSpans, col) {
                        if (col.hasOwnProperty('children')) {
                            return colSpans += col.hasOwnProperty('colSpan') ? col.colSpan : col.children.length;
                        }
                        else {
                            return colSpans += 2;
                        }
                    }, 0);
                    zerothRow += "<th colspan=\"" + colSpans + "\" >" + key + "</th>";
                });
                zerothRow += "</tr>";
            }
            firstLevelColumns.map(function (col) {
                if (col.hasOwnProperty('children')) {
                    var childColWidth = 0;
                    col.children.map(function (col) {
                        childColWidth += parseInt(col.width);
                    });
                    var colSpans = col.hasOwnProperty('colSpan') ? col.colSpan : col.children.length;
                    //this means we have a column with sub columns
                    firstRow += "<th colspan=\"" + colSpans + "\" >";
                }
                else {
                    //this means we have a blank parent column
                    if (zeroLevelColumns.length > 0) {
                        return;
                    }
                    else {
                        firstRow += "<th rowspan=\"2\">";
                    }
                }
                firstRow += col.headerText + "</th>";
            });
            firstRow += "</tr>";
        }
        else {
            secondLevelColumns = columns;
        }
        var secondRow = "<tr " + ((zeroLevelColumns.length > 0) ? "style='height:18px;'" : "") + ">";
        secondLevelColumns.map(function (col) {
            secondRow += "<th colspan=\"" + (col.hasOwnProperty('colSpan') ? col.colSpan : 1) + "\">" + col.headerText + "</th>";
        });
        secondRow += "</tr>";
        if (zeroLevelColumns.length > 0) {
            phatomRow = phatomRow + $(firstRow).html() + "</tr>";
            zerothRow = phatomRow + zerothRow;
            var container = $('<div/>').append(secondRow);
            container.find('th').each(function () {
                $(this).html($(this).html().slice(0, 15));
            });
            secondRow = container.html();
        }
        this.refs.tableNode.innerHTML = this.beginTable() + ((zeroLevelColumns.length > 0) ? zerothRow : "") + firstRow + secondRow + this.endTable();
    }
    beginTable() {
        return "<table class=\"table table-striped table-hover persist-area\"  style=\"max-height: " + this.props.height + "; width: " + this.props.width + "\"><thead" +
            (this.props.enableFixedHeader ? " class=\"persist-header\" " : "") + ">";
    }
    endTable() {
        return "</thead><tbody class='content'></tbody></table>" + (this.props.leftLockedCount > 0 ? "<div class='resize_divider'></div><div class='resize_handle'></div>" : "");
    }
}
;
