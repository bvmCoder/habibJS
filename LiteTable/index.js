/* eslint-disable */

import * as React from 'react';
import { PropTypes } from 'react';
import * as ReactDOM from "react-dom";
const $ = require('jquery');
const dataTables = require('datatables.net');
const dataTablesFixedColumns = require('datatables.net-fixedcolumns');
const registScrollParent = require('./util/scrollParent').default;
const styles = require('../Table/style.less');
const myStyles = require('./style.less');
const addDragHandler = require('./draggable').default;
const adjustScrollbar = require('./fixedColumns').default;
const initFixedHeader = require('./fixedHeader').default;
const initRowGrouping = require('./rowGrouping').default;
const initTreeView = require('./treeView').default;
const defaultOptions = {
    paging: false,
    ordering: false,
    searching: false,
    info: false
};
export default class LiteTable extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.initialize();
    }
    componentDidUpdate(prevProps, prevState) {
        this.destroy();
        this.initialize();
    }
    componentWillUnmount() {
        this.destroy();
    }
    initialize() {
        this.renderTableNode();
        registScrollParent();
        if (!$.fn.DataTable) {
            dataTables(window, $);
            dataTablesFixedColumns(window, $);
        }
        const options = Object.assign({}, defaultOptions, this.props.options, {});
        if (options.rowGroupingIndex > -1) {
            initRowGrouping(this.tableNode, options);
        }
        this.api = $(this.tableNode).DataTable(options);
        if (options.fixedColumns) {
            addDragHandler(this.wrapperNode, this.api, options);
            adjustScrollbar(this.wrapperNode, this.api, options);
        }
        if (options.fixedRows) {
            initFixedHeader(this.wrapperNode, this.api, options);
        }
        if (options.treeView) {
            initTreeView(this.wrapperNode, this.api, options);
        }
    }
    destroy() {
        if (this.api) {
            this.api.destroy();
            ReactDOM.unmountComponentAtNode(this.wrapperNode);
        }
    }
    renderTableNode() {
        var $table = (<table ref={(i) => this.tableNode = i} className="neptuneTable">
            {this.props.children}
        </table>);
        ReactDOM.render($table, this.wrapperNode);
    }
    render() {
        return <div className="LiteTableWrapper" ref={(i) => this.wrapperNode = i} style={this.props.style}/>;
    }
}
LiteTable.propTypes = {
    children: PropTypes.node
};
/*
New Params,
    options:{
        fixedColumns: {
            leftColumns: 1,
            rightColumns: 1,
        },
        fixedRows: {
            offsetTop: 120,
            callback: function (isShow, $headWrappers, api, scrollTop, headerHeight) {
            },
        },
        rowGroupingIndex: -1,
        treeView: {
            identSize: 25,
            toggleAll: false
        }
    }
*/
