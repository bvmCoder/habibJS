/* eslint-disable */

const $ = require('jquery');
import debounce from './util/debounce';
const getDefaultCallback = function (options) {
    const rowGoupingCallback = (function () {
        var $groupTrs;
        var $headerFirstTh;
        var origText;
        var callback = function (isShow, $headWrappers, api, scrollTop, headerHeight) {
            $groupTrs = $groupTrs || $(api.table().node()).find('tr.group');
            $headerFirstTh = $headerFirstTh || $headWrappers.find('th:eq(0)').slice(0, 2);
            if (!isShow) {
                origText = origText || $headerFirstTh.eq(0).text();
                $headerFirstTh.text(origText);
                return;
            }
            for (var i = 0; i < $groupTrs.length; i++) {
                var $tr = $groupTrs.eq(i);
                if (scrollTop > $tr.offset().top - headerHeight) {
                    $headerFirstTh.text($tr.children().first().text());
                }
            }
        };
        return callback;
    })();
    return options.rowGroupingIndex > -1 ? rowGoupingCallback : function () { };
};
const handleFixedColumns = function ($scrollHead, $scrollWrapper, $wrapper, api) {
    const $leftBodyWrapper = $wrapper.find('.DTFC_LeftBodyWrapper');
    const $leftHeadWrapper = $leftBodyWrapper.prev().width($leftBodyWrapper.width());
    const $rightBodyWrapper = $wrapper.find('.DTFC_RightBodyWrapper');
    const $rightHeadWrapper = $rightBodyWrapper.prev().width($rightBodyWrapper.width());
    api.on('column-sizing.dt', function () {
        $scrollHead.width($scrollWrapper.width());
        $leftHeadWrapper.width($leftBodyWrapper.width());
    });
    return $scrollHead.add($leftHeadWrapper).add($rightHeadWrapper);
};
const initFixedHeader = function (wrapper, api, options) {
    var $wrapper = $(wrapper);
    const $scrollHead = $wrapper.find('.dataTables_scrollHead');
    const $scrollWrapper = $scrollHead.parent();
    $scrollHead.width($scrollWrapper.width());
    var $headWrappers = $scrollHead;
    if (options.fixedColumns) {
        $headWrappers = handleFixedColumns($scrollHead, $scrollWrapper, $wrapper, api);
    }
    var headerHeight = $scrollHead.height();
    var $placeHolders = $('<div style="display:none;height:' + headerHeight + 'px" />').insertBefore($headWrappers);
    $headWrappers.css({ position: '', left: '' });
    var tableTop = $scrollWrapper.offset().top;
    var scrollParentOffsetTop = 0;
    var $scrollParent = $wrapper.scrollParent();
    if ($scrollParent[0] !== window.document) {
        scrollParentOffsetTop = $scrollParent.offset().top;
        tableTop = $scrollWrapper.offset().top - scrollParentOffsetTop + $scrollParent.scrollTop();
    }
    else {
        $scrollParent = $(window);
    }
    var tableHeight = $scrollWrapper.height();
    var offsetTop = options.fixedRows.offsetTop || 0;
    var callback = options.fixedRows.callback || getDefaultCallback(options);
    var toggleHeaders = debounce(function () {
        var scrollTop = $scrollParent.scrollTop() + offsetTop;
        if (scrollTop > tableTop && scrollTop < tableTop + tableHeight - headerHeight) {
            $headWrappers.addClass('DTFC_fixed_header');
            $headWrappers.css({ top: scrollParentOffsetTop + offsetTop, 'margin-left': -$scrollParent.scrollLeft() });
            $placeHolders.show();
            callback(true, $headWrappers, api, scrollParentOffsetTop || scrollTop, headerHeight);
        }
        else {
            $headWrappers.removeClass('DTFC_fixed_header');
            $placeHolders.hide();
            callback(false, $headWrappers, api);
        }
    }, 10);
    $scrollParent.scroll(toggleHeaders);
    api.on('destroy.dt', function () {
        $scrollParent.off('scroll', toggleHeaders);
    });
};
export default initFixedHeader;
