/* eslint-disable */

const $ = require('jquery');
const doAdjustScrollbar = function ($wrapper, leftColumns, rightColumns) {
    rightColumns = rightColumns || 0;
    var $scrollWrapper = $wrapper.find('.dataTables_scroll');
    var $headerInner = $scrollWrapper.find('.dataTables_scrollHeadInner');
    var $outer = $scrollWrapper.find('.dataTables_scrollBody');
    var $inner = $outer.children('table');
    var leftFixedColWidth = $wrapper.find('.DTFC_LeftWrapper').width();
    var rightFixedColWidth = rightColumns ? $wrapper.find('.DTFC_RightWrapper').width() : 0;
    var fixedColWidth = leftFixedColWidth + rightFixedColWidth;
    var outerWidth = $scrollWrapper.width();
    $outer.css({ 'margin-left': leftFixedColWidth + 'px', 'width': (outerWidth - fixedColWidth) + 'px' });
    var innerWidth = $headerInner.width();
    $inner.css({
        'margin-left': (-leftFixedColWidth) + 'px',
        'width': (innerWidth - rightFixedColWidth) + 'px'
    });
    if (rightColumns) {
        var $trs = $inner.find('thead > tr, tbody > tr');
        for (var i = 0; i < $trs.length; i++) {
            var $tds = $trs.eq(i).children();
            if ($tds.length > rightColumns) {
                $tds.slice(-(rightColumns)).hide();
            }
        }
    }
};
const adjustScrollbar = function (wrapper, api, options) {
    let { leftColumns, rightColumns } = options.fixedColumns;
    var $wrapper = $(wrapper);
    const callback = function () {
        doAdjustScrollbar($wrapper, leftColumns, rightColumns);
    };
    callback();
    api.on('column-sizing.dt', function () {
        callback();
    });
};
export default adjustScrollbar;
