/* eslint-disable */

import $ from 'jquery';
const insertGroupRow = function (api, bodyNode, colIndex, render) {
    if (!bodyNode)
        return;
    var $rows = $('tbody > tr', bodyNode);
    var colSpan = $rows.eq(0).children().length;
    var last = null;
    api.column(colIndex).data().each(function (group, i) {
        if (last === group)
            return;
        const meta = { row: -1, col: colIndex, settings: {} };
        const displayGroup = render ? render(group, "display", api.data()[0], meta) : group;
        const $groupRow = $('<tr class="group" ><td colspan="' + colSpan + '">' + displayGroup + '</td></tr>');
        $groupRow.insertBefore($rows.eq(i));
        last = group;
    });
};
const initRowGrouping = function (tableNode, options) {
    const colIndex = options.rowGroupingIndex;
    const column = options.columns[colIndex];
    column.width = 0;
    column.visible = false;
    if (!options.fixedColumns) {
        //this wont work with fixed columns
        options.drawCallback = function (settings) {
            var api = this.api();
            insertGroupRow(api, tableNode, colIndex, column.render);
        };
    }
    else {
        //locked column fixed headers - complicates things a little bit.
        const fnDrawCallback = function (left, right) {
            var api = $(this.dom.body).dataTable().api();
            insertGroupRow(api, tableNode, colIndex, column.render);
            insertGroupRow(api, left.body, colIndex, column.render);
            insertGroupRow(api, right.body, colIndex, function () { return '&nbsp;'; });
            api.columns.adjust();
        };
        Object.assign(options.fixedColumns, { fnDrawCallback });
    }
};
export default initRowGrouping;
