/* eslint-disable */
const $ = require('jquery');
export default class RowGrouping {
    constructor(wrapper, options, flatCols, optionsColDefs) {
        const dataField = wrapper.props.rowGroupingField;
        //figure out how many inner columns
        const matchCol = $.grep(flatCols, (e) => {
            return (e.title || e.dataField) === dataField;
        });
        const colIndex = flatCols.indexOf(matchCol[0]);
        const $tableDomNode = $(wrapper.getTableDomNode());
        optionsColDefs.push({ "visible": false, "targets": colIndex }); //hide the grouping column
        options.orderFixed = [colIndex, 'asc']; //make sure you force a sort by the grouping column always
        if (typeof wrapper.props.leftLockedCount === 'undefined' || wrapper.props.leftLockedCount === 0) {
            //this wont work with fixed columns
            options.drawCallback = function () {
                var api = this.api();
                var rows = api.rows().nodes();
                var visibleColCount = 0;
                api.columns().eq(0).each((index) => {
                    var column = api.column(index);
                    if (column.visible()) {
                        visibleColCount++;
                    }
                });
                var last = null;
                var groupIndex = 1;
                api.column(colIndex).data().each((group, i) => {
                    if (last !== group) {
                        const displayGroup = matchCol[0].cellHtmlCallback ?
                            matchCol[0].cellHtmlCallback(group, "display", i, colIndex, matchCol[0]) : group;
                        const generatedRow = $('<tr class="group" ><td colspan="' + (visibleColCount) + '">' + displayGroup + '</td></tr>');
                        $(rows).eq(i).before(
                            generatedRow
                        );
                        if (matchCol[0].cellRenderedCallback) {
                            matchCol[0].cellRenderedCallback(generatedRow, group, displayGroup, groupIndex++, colIndex);
                        }
                        last = group;
                    }
                });
            };
        } else {
            //locked column fixed headers - complicates things a little bit.
            //const oTable = wrapper.dataTable;
            options.fixedColumns = {
                leftColumns: wrapper.props.leftLockedCount,
                fnDrawCallback(left) { // eslint-disable-line max-statements
                    var oSettings = this.s.dt;
                    if (oSettings.aiDisplay.length === 0) {
                        return;
                    }
                    var nGroup;
                    var nCell;
                    var iIndex;
                    var sGroup;
                    var sLastGroup = "";
                    var iCorrector = 0;
                    var nTrs = $tableDomNode.find('tbody tr');
                    var iColspan = nTrs[0].getElementsByTagName('td').length;
                    for (var i = 0; i < nTrs.length; i++) {
                        iIndex = oSettings._iDisplayStart + i;
                        sGroup = oSettings.aoData[oSettings.aiDisplay[iIndex]]._aData[colIndex];
                        if (sGroup !== sLastGroup) {
                            /* Cell to insert into main table */
                            nGroup = document.createElement('tr');
                            nCell = document.createElement('td');
                            nCell.colSpan = iColspan;
                            nGroup.className = "group";
                            nCell.innerHTML = "&nbsp;";
                            nGroup.appendChild(nCell);
                            nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);
                            /* Cell to insert into the frozen columns */
                            nGroup = document.createElement('tr');
                            nCell = document.createElement('td');
                            nGroup.className = "group";
                            nCell.innerHTML = sGroup;
                            nGroup.appendChild(nCell);
                            $(nGroup).insertBefore($('tbody tr:eq(' + (i + iCorrector) + ')', left.body)[0]);
                            iCorrector++;
                            sLastGroup = sGroup;
                        }
                    }
                }
            };
        }
    }
}
