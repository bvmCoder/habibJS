/* eslint-disable */
import * as React from 'react';
const _ = require('lodash');
const styles = require('./style.less');
const DataTableWrapper = require('./DataTables/DataTableWrapper');
export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate() {
        return this.props.enableComponentUpdates;
    }
    renderFixedColumn() {
        let fixedNum = this.props.fixedColumn;
        if (this.props.rowGroupingField) {
            fixedNum += 1;
        }
        const cols1 = _.slice(this.props.columns, 0, fixedNum);
        const cols2 = _.slice(this.props.columns, 0, this.props.columns.length);
        const table1 = this.renderDataTableWrpper(cols1, "dt1", _.assign({}, this.props, { width: "100%", enableScroll: false }));
        const table2 = this.renderDataTableWrpper(cols2, "dt2", _.assign({}, this.props, { width: "100%", leftLockedCount: 1, enableScroll: true, isScrollTable: true }));
        const _width = this.props.width ? this.props.width : '100%';
        const style1 = {
            position: "absolute",
            width: _width
        };
        const style2 = {
            position: "relative", left: "200px", width: _width
        };
        return (<div>
          <div className="fixedTable" style={style1}>
            {table1}
          </div>
          <div className="scrollTable" style={style2}>
            {table2}
          </div>
        </div>);
    }
    renderDefault() {
        return this.renderDataTableWrpper(this.props.columns, "dataTable", this.props);
    }
    renderDataTableWrpper(cols, refs, props) {
        return (<DataTableWrapper.default columns={cols} ref={refs} enablePaging={props.enablePaging} pageLength={props.pageLength} enableShowTotalCount={props.enableShowTotalCount} enableComponentUpdates={props.enableComponentUpdates} enableOrdering={props.enableOrdering} enableSearch={props.enableSearch} enableVerticalScroll={props.enableVerticalScroll} enableHorizontalScroll={props.enableHorizontalScroll} enableScroll={props.enableScroll} enableDeferRender={props.enableDeferRender} rowGroupingField={props.rowGroupingField} defaultSortField={props.defaultSortField} enableFixedHeader={props.enableFixedHeader} enableFixedGroupingRow={props.enableFixedGroupingRow} removeFirstGroupRow={props.removeFirstGroupRow} fixedHeaderOffset={props.fixedHeaderOffset} isLoading={props.isLoading} leftLockedCount={props.leftLockedCount} rightLockedCount={props.rightLockedCount} rowCreatedCallback={props.rowCreatedCallback} headerCreatedCallback={props.headerCreatedCallback} cellClickCallback={props.cellClickCallback} fixedRowCreatedCallback={props.fixedRowCreatedCallback} width={props.width} height={props.height} fixedColumn={props.fixedColumn} isScrollTable={props.isScrollTable} onColumnSortCallback={props.onColumnSortCallback}/>);
    }
    renderResult() {
        if (this.props.fixedColumn) {
            return this.renderFixedColumn();
        }
        else {
            return this.renderDefault();
        }
    }
    render() {
        return this.renderResult();
    }
    foreachCols(flattendCols, curCol, self) {
        _.forEach(curCol.children, (c) => {
            if (c.hasOwnProperty('children')) {
                flattendCols = self.foreachCols(flattendCols, c, self);
            }
            else {
                flattendCols = flattendCols.concat([c]);
            }
        });
        return flattendCols;
    }
    setDataMultiHierarchy(data, tablep) {
        let table = this.refs['dataTable'];
        if (tablep) {
            table = tablep;
        }
        const cols = this.props.columns;
        var flattendCols = [];
        const self = this;
        cols.map(col => { flattendCols = flattendCols.concat((col.children && col.children.length > 0) ? col.children : [col]); });
        let result = data.map(row => {
            return flattendCols.map(col => {
                //current only support 2 hierarchy value. ex 2013.111
                if (col.dataField.indexOf('.') > -1) {
                    const valList = col.dataField.split('.');
                    return row.hasOwnProperty(valList[0]) ? row[valList[0]][valList[1]] : "";
                }
                return row[col.dataField];
            });
        });
        table.setDataArray(result);
    }
    setData(data) {
        const table = this.refs['dataTable'];
        const cols = this.props.columns;
        var flattendCols = [];
        cols.map(col => { flattendCols = flattendCols.concat((col.children && col.children.length > 0) ? col.children : [col]); });
        let result = data.map(row => {
            return flattendCols.map(col => {
                return row[col.dataField];
            });
        });
        table.setDataArray(result);
    }
    setEachColData(data, table) {
        const cols = this.props.columns;
        var flattendCols = [];
        cols.map(col => { flattendCols = flattendCols.concat((col.children && col.children.length > 0) ? col.children : [col]); });
        let result = data.map(row => {
            return flattendCols.map(col => {
                return row[col.dataField];
            });
        });
        table.setDataArray(result);
    }
    setFixedColumnData(data, setFCData) {
        let table = this.refs["dt1"];
        let setDataFunc = this.setEachColData.bind(this);
        if (setFCData) {
            setDataFunc = setFCData.bind(this);
        }
        setDataFunc(data, table);
        table = this.refs["dt2"];
        setDataFunc(data, table);
        table.visibleColumns(0, false);
    }
    setDataArray(data) {
        const table = this.refs['dataTable'];
        table.setDataArray(data);
    }
    setFixedColumns(columns, hasGroupedColumns) {
        let table = this.refs["dt1"];
        table.setColumns(columns, hasGroupedColumns);
        table = this.refs["dt2"];
        table.setColumns(columns, hasGroupedColumns);
    }
    setColumns(columns, hasGroupedColumns) {
        const table = this.refs['dataTable'];
        table.setColumns(columns, hasGroupedColumns);
    }
    adjustColumns(columns) {
        const table = this.refs['dataTable'];
        table.adjustColumns();
    }
    visibleColumns(colIndexs, visble) {
        const table = this.refs['dataTable'];
        table.visibleColumns(colIndexs, visble);
    }
    getDataTable() {
        const table = this.refs['dataTable'];
        return table.getDataTable();
    }
    rebuildFloatingHeader() {
        const table = this.refs['dataTable'];
        table.rebuildFloatingHeader();
    }
    initialize() {
        const table = this.refs['dataTable'];
        table.initialize();
    }
    renderIntoNode(element, container, callback) {
        const table = this.refs['dataTable'];
        return table.renderIntoNode(element, container, callback);
    }
}
Table.propTypes = {
    columns: React.PropTypes.array,
    enablePaging: React.PropTypes.bool,
    pageLength: React.PropTypes.number,
    enableShowTotalCount: React.PropTypes.bool,
    enableComponentUpdates: React.PropTypes.bool,
    enableOrdering: React.PropTypes.bool,
    enableSearch: React.PropTypes.bool,
    enableVerticalScroll: React.PropTypes.bool,
    enableHorizontalScroll: React.PropTypes.bool,
    enableScroll: React.PropTypes.bool,
    enableDeferRender: React.PropTypes.bool,
    rowGroupingField: React.PropTypes.string,
    defaultSortField: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.arrayOf(React.PropTypes.string),
    ]),
    enableFixedHeader: React.PropTypes.bool,
    enableFixedGroupingRow: React.PropTypes.bool,
    removeFirstGroupRow: React.PropTypes.bool,
    fixedHeaderOffset: React.PropTypes.number,
    isLoading: React.PropTypes.bool,
    leftLockedCount: React.PropTypes.number,
    rightLockedCount: React.PropTypes.number,
    rowCreatedCallback: React.PropTypes.func,
    headerCreatedCallback: React.PropTypes.func,
    cellClickCallback: React.PropTypes.func,
    fixedRowCreatedCallback: React.PropTypes.func,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    onColumnSortCallback: React.PropTypes.func,
    fixedColumn: React.PropTypes.number,
    isScrollTable: React.PropTypes.bool,
};
Table.defaultProps = {
    width: '100%',
    height: '300px',
    pageLength: 20,
    enablePaging: true,
    enableShowTotalCount: true,
    enableComponentUpdates: false,
    enableOrdering: true,
    enableSearch: true
};
