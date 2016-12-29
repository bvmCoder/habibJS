/* eslint-disable */

const $ = require('jquery');
const Draggable = require('./util/draggable').default;
const getRealWidth = function (aoColumn) {
    return parseInt(aoColumn.sWidth.replace('px', ''));
};
const initDragHandler = function ($wrapper, api) {
    const $resizeHandler = $wrapper.find('.resize_handler');
    const $resizeDivider = $wrapper.find('.resize_divider');
    const aoColumn = api.settings()[0].aoColumns[0];
    const resizeOffset = 23;
    const resizeHandlerWidth = 13; // 6px = half width of Resize Handler Bar
    const firstColumnWidth = getRealWidth(aoColumn) + resizeOffset;
    $resizeHandler.css('left', firstColumnWidth - resizeHandlerWidth);
    $resizeDivider.css('height', $wrapper.find('.DTFC_ScrollWrapper').height());
    const dragOptions = {
        limit: {
            x: [firstColumnWidth - resizeHandlerWidth, firstColumnWidth * 3],
            y: $resizeHandler.position().top
        },
        onDrag(element, x, y, event) {
            //$resizeDivider.css('left', $resizeHandler.position().left + resizeHalfWidth); 
        },
        onDragStart(element, x, y, event) {
            $resizeDivider.css('background-color', '#000');
            //$resizeDivider.css('left', $resizeHandler.position().left + resizeHalfWidth);
        },
        onDragEnd(element, x, y, event) {
            $resizeDivider.css('background-color', 'transparent');
            const newWidth = ($resizeHandler.position().left + resizeHandlerWidth - resizeOffset) + 'px';
            aoColumn.sWidthOrig = aoColumn.sWidth = aoColumn.width = newWidth;
            api.columns.adjust();
        }
    };
    new Draggable($resizeHandler[0], dragOptions);
};
const adjustFixedColumnsWidth = function ($wrapper, api) {
    const aoColumn = api.settings()[0].aoColumns[0];
    const $firstTh = $wrapper.find('.DTFC_LeftHeadWrapper, .DTFC_LeftBodyWrapper')
        .find('.neptuneTable > thead > tr:eq(0) th:eq(0)');
    $firstTh.css('width', aoColumn.sWidth);
};
const addDragHandler = function (wrapper, api, options) {
    const leftColumns = options.fixedColumns.leftColumns || 0;
    if (leftColumns === 0)
        return;
    const $wrapper = $(wrapper);
    const $divDivider = $("<div class='resize_handler'><div class='resize_divider'></div></div>");
    $wrapper.find('.DTFC_LeftBodyWrapper').after($divDivider);
    initDragHandler($wrapper, api);
    api.on('column-sizing.dt', function () {
        adjustFixedColumnsWidth($wrapper, api);
    });
};
export default addDragHandler;
