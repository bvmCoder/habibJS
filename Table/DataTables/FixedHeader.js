/* eslint-disable */
const $ = require('jquery');
import _ from 'lodash';
export default class FixedHeader {
    constructor(wrapper, options) {
        let tableWidth = 0;
        const $tableDomNode = $(wrapper.getTableDomNode());
        var clonedHTML = "";
        const tableCells = $tableDomNode.find("th");
        const corder = this.getCoords;
        const coords = corder($tableDomNode.context);
        const scroller = $tableDomNode.scrollParent();
        const scrollParentCoords = corder(scroller[0]);
        const scrollerOffsetTop = scroller.offset() ? scroller.offset().top : 0;
        const thead = $tableDomNode.find("thead:first-child");
        const fixedHeaderOffset = wrapper.props.fixedHeaderOffset || 0;
        const enableFixedGroupingRow = wrapper.props.enableFixedGroupingRow;
        const $floater = $("<div class='floatingRow' style='position:fixed;top:" + (scrollParentCoords.top + fixedHeaderOffset) + "px;left:" + coords.left + "px;width:" + $tableDomNode.outerWidth() + "px;'/>");
        const isFirefox = typeof InstallTrigger !== "undefined";
        const isIE = false || !!document.documentMode;
        const isChrome = !!window.chrome && !!window.chrome.webstore;
        let tableTop = null;
        let adjustment = 0;
        if (isFirefox) {
            adjustment = -1;
        }
        if (isIE) {
            adjustment = 1.5;
        }
        if (isChrome) {
            adjustment = 1;
        }
        if ($(".zerothRow").length > 0) {
            adjustment = 0;
        }
        wrapper.$floater = $floater;
        $floater.on('click', 'div.floatingCell', function (e) {
            const cellIdx = e.currentTarget.getAttribute("data-column");
            const cell = tableCells[cellIdx];
            $(cell).trigger("click.DT");
            $floater.html("");
            scroller.trigger("scroll");
        });
        $tableDomNode.after($floater);
        let stickyDefaultTop = 0;
        let getScrollbarWidth = function () {
            let scrollParent = scroller;
            if ($tableDomNode.width !== scroller.width || scroller.is(document)) {
                scrollParent = $tableDomNode.parent();
            }
            if ($('.dataTables_scrollBody').find('table').height() <= $('.dataTables_scrollBody').height()) {
                return 0;
            }
            var outer = $("<div/>");
            outer.css('visibility', "hidden");
            outer.css('width', "100px");
            scrollParent.append(outer);
            var widthNoScroll = outer.get(0).offsetWidth;
            // force scrollbars
            outer.css('overflow', "scroll");
            // add innerdiv
            var inner = $("<div/>");
            inner.css('width', "100%");
            outer.append(inner);
            var widthWithScroll = inner.get(0).offsetWidth;
            // remove divs
            outer.remove();
            return widthNoScroll - widthWithScroll - 1;
        };
        const updateTableHeaders = function () {
            const stickyHeaderTop = $tableDomNode.offset().top - (fixedHeaderOffset);
            if (!$tableDomNode.width()) {
                $floater.html("");
                return;
            }
            const theadCoords = thead.offset();
            if (!$floater.html()) {
                $floater
                    .css('width', $tableDomNode.outerWidth())
                    .css('left', $tableDomNode.offset().left)
                    .css('height', thead.outerHeight());
                var cellClones = "";
                tableCells.map((idx, cell) => {
                    if (cell.offsetWidth > 0) {
                        const cellCoords = $(cell).offset();
                        cellClones += "<div class='floatingCell " + cell.className + "' data-column='"
                            + idx + "'style='position:absolute;width:" + cell.offsetWidth
                            + "px;height:" + (cell.offsetHeight)
                            + "px;left:" + (cell.offsetLeft)
                            + "px;top:" + (cellCoords.top - theadCoords.top)
                            + "px;'><span style='height:" + (cell.offsetHeight)
                            + "px'>" + cell.innerHTML + "</span></div>";
                    }
                });
                if (enableFixedGroupingRow) {
                    $floater.css('height', thead.outerHeight() * 2);
                    cellClones += "<div class='floatingGroupCell' style='position:absolute;width:" + $tableDomNode.outerWidth()
                        + "px;height:" + (thead.outerHeight())
                        + "px;left:" + (0)
                        + "px;top:" + (thead.outerHeight())
                        + "px;'><span class='floatingGroupCellSpan' style='height:" + (thead.outerHeight())
                        + "px'>" + "" + "</span></div>";
                }
                $floater.html(cellClones);
                if (wrapper.props.fixedRowCreatedCallback) {
                    wrapper.props.fixedRowCreatedCallback($floater);
                }
            }
            const display = ((scroller.scrollTop() > stickyHeaderTop) ? "" : "none");
            $floater.css('display', display);
            if (display === "none") {
                $floater.html("");
            }
            else {
                if (enableFixedGroupingRow) {
                    //need to update floating header.                        
                    const nTrs = $tableDomNode.find('tbody tr.group');
                    for (var i = nTrs.length - 1; i >= 0; i--) {
                        const tr = nTrs[i];
                        const $tr = $(tr);
                        //this means this is a group row
                        if (($tr.offset().top - (2 * $tr.outerHeight())) < $floater.offset().top) {
                            //this tr is visible
                            const groupSpan = $floater.find('.floatingGroupCellSpan');
                            if ($tr.attr('group') !== undefined) {
                                groupSpan.text($tr.attr('group'));
                            }
                            else {
                                groupSpan.text($tr.text());
                            }
                            break;
                        }
                    }
                }
            }
        };
        const debouncedResizerShownFunc = _.debounce(() => { $($tableDomNode.parents().find('.resize_handle')[0]).show(); }, 200, { trailing: true });
        const updateTableHeadersCorrect = function () {
            const stickyHeaderTop = $tableDomNode.offset().top - 50 - (fixedHeaderOffset);
            let handleHeight = 0;
            if (tableTop === null && $('.fixedTable').position()) {
                tableTop = $('.fixedTable').position().top;
            }
            if (scroller.scrollTop() <= stickyDefaultTop) {
                handleHeight = 0;
            }
            if (scroller.scrollTop() > stickyDefaultTop) {
                if ($('.fixedTable').position() && $('.fixedTable').position().top === 0 && $('.fixedTable').offset()) {
                    tableTop = $('.fixedTable').offset().top;
                }
                handleHeight = scroller.scrollTop() - tableTop + fixedHeaderOffset;
                if (!isChrome) {
                    $($tableDomNode.parents().find('.resize_handle')[0]).hide();
                }
            }
            if (wrapper.props.height < scroller.scrollTop()) {
                handleHeight = 0;
            }
            $($tableDomNode.parents().find('.resize_handle')[0]).css('top', handleHeight);
            const theadCoords = thead.offset();
            $floater.css('width', $tableDomNode.offsetParent().width() - getScrollbarWidth())
                .css('left', $tableDomNode.offset().left - $(document).scrollLeft() + (($tableDomNode.parents('.scrollTable').length > 0) ? $('div.dataTables_scrollBody').scrollLeft() : 0) +
                ((isFirefox || $('div.dataTables_scrollBody').get(0) && ($('div.dataTables_scrollBody').scrollLeft() + adjustment) > ($('div.dataTables_scrollBody').get(0).scrollWidth - $('div.dataTables_scrollBody').get(0).clientWidth)) ? adjustment : 0))
                .css('overflow', 'hidden')
                .css('height', thead.outerHeight());
            if (!$floater.html()) {
                var cellClones = "";
                tableCells.map((idx, cell) => {
                    if (cell.offsetWidth > 0) {
                        let offsetHeight = cell.offsetHeight;
                        let inHtml = wrapper.props.rowGroupingField || cell.innerHTML;
                        const cellCoords = $(cell).offset();
                        if (typeof wrapper.props.isScrollTable === 'undefined') {
                            const heightMul = wrapper.props.columns[wrapper.props.fixedColumn - 1].children ? (wrapper.props.columns[wrapper.props.fixedColumn - 1].categoryText ? 4 : 2) : 1;
                            offsetHeight = offsetHeight * heightMul;
                            cellClones = "<div class='floatingCell " + cell.className + "' data-column='"
                                + idx + "'style='position:absolute;width:" + cell.offsetWidth
                                + "px;height:" + (offsetHeight)
                                + "px;left:" + (cell.offsetLeft)
                                + "px;'><span class='floatingFirstTh' style='height:" + (offsetHeight)
                                + "px'>" + "" + "</span></div>";
                        }
                        else {
                            cellClones += "<div class='floatingCell " + cell.className + "' data-column='"
                                + idx + "'style='position:absolute;width:" + cell.offsetWidth
                                + "px;height:" + (offsetHeight)
                                + "px;left:" + (cell.offsetLeft)
                                + "px;top:" + (cellCoords.top - theadCoords.top)
                                + "px;'><span style='height:" + (offsetHeight)
                                + "px'>" + cell.innerHTML + "</span></div>";
                        }
                    }
                });
                if (enableFixedGroupingRow) {
                    $floater.css('height', thead.outerHeight() * 2);
                    cellClones += "<div class='floatingGroupCell' style='position:absolute;width:" + $tableDomNode.outerWidth()
                        + "px;height:" + (thead.outerHeight())
                        + "px;left:" + (0)
                        + "px;top:" + (thead.outerHeight())
                        + "px;'><span class='floatingGroupCellSpan' style='height:" + (thead.outerHeight())
                        + "px'>" + "" + "</span></div>";
                }
                $floater.html($("<div/>").html(cellClones));
                if (wrapper.props.fixedRowCreatedCallback) {
                    wrapper.props.fixedRowCreatedCallback($floater);
                }
            }
            if (stickyDefaultTop === 0) {
                stickyDefaultTop = stickyHeaderTop;
            }
            const display = ((scroller.scrollTop() > stickyDefaultTop && scroller.scrollTop() < wrapper.props.height + stickyDefaultTop - 50) ? "" : "none");
            $floater.css('display', display);
            $('.floatingRow').eq(1).scrollLeft($('div.dataTables_scrollBody').scrollLeft());
            if ($('.floatingRow').eq(0).css('display') === "none" && wrapper.props.isScrollTable) {
                $('.floatingRow').css('display', "none");
            }
            if (display === "none") {
                $('.floatingRow').html("");
            }
            else {
                const nTrs = $tableDomNode.find('tbody tr');
                for (var i = nTrs.length - 1; i >= 0; i--) {
                    const tr = nTrs[i];
                    const $tr = $(tr);
                    //this means this is a group row
                    if (($tr.offset().top - (2 * $tr.outerHeight())) < $floater.offset().top) {
                        //this tr is visible
                        if (enableFixedGroupingRow) {
                            //need to update floating header.                        
                            const groupSpan = $floater.find('.floatingGroupCellSpan');
                            if ($tr.attr('group') !== undefined) {
                                groupSpan.text($tr.attr('group'));
                            }
                            else {
                                groupSpan.text($tr.text());
                            }
                        }
                        else if ($tr.attr('group') !== undefined) {
                            $floater.find('.floatingFirstTh').text($tr.attr('group').indexOf('0000') > -1 ? $tr.attr('group').substring(4) : $tr.attr('group'));
                        }
                        break;
                    }
                }
            }
            if (!isChrome) {
                debouncedResizerShownFunc.cancel();
                debouncedResizerShownFunc();
            }
        };
        options.initComplete = function () {
            if (wrapper.props.fixedColumn) {
                scroller.scroll(updateTableHeadersCorrect).trigger("scroll");
                if (wrapper.props.isScrollTable) {
                    if (wrapper.props.columns[0].width) {
                        $('.scrollTable').width($('.scrollTable').width() - wrapper.props.columns[0].width);
                        $('.scrollTable').css('left', wrapper.props.columns[0].width);
                    }
                    else {
                        $('.scrollTable').width($('.scrollTable').width() - 200);
                    }
                    $('.fixedTable').width($('.scrollTable').width());
                }
            }
            else {
                scroller.scroll(updateTableHeaders).trigger("scroll");
            }
            $tableDomNode.on('destroy.dt', function (e, settings) {
                $(window).off('scroll', updateTableHeadersCorrect);
                $(window).off('resize');
                $(window).off('click');
                $('div.dataTables_scrollBody').off('scroll');
            });
        };
        const refreshCallback = (event) => {
            if (wrapper.props.fixedColumn) {
                if ($('.scrollTable').count === 0 || typeof $('.scrollTable').position() === "undefined") {
                    return;
                }
                $floater.html("");
                updateTableHeadersCorrect();
                if (event.type === "resize") {
                    let newWidth = parseInt($('.scrollTable').css('left')) + 20;
                    newWidth = newWidth >= 220 ? newWidth : 220;
                    $('.fixedTable').css('width', newWidth);
                    $('.fixedTable td').css('width', newWidth);
                }
            }
            else {
                $floater.html("");
                $floater.off("click");
            }
        };
        //$(window).resize(refreshCallback);
        $(window).resize(() => {
            scroller.trigger("scroll");
            $('.scrollTable').css('width', $('.scrollTable').parents(".neptune-table").width() - parseInt($('.scrollTable').css('left')));
        });
        $(window).on('refreshHeader', refreshCallback);
    }
    getCoords(elem) {
        if (elem == document) {
            return { top: 0, left: 0 };
        }
        var box = elem.getBoundingClientRect();
        var style = window.getComputedStyle(elem);
        var margin = {
            left: parseInt(style["margin-left"]),
            right: parseInt(style["margin-right"]),
            top: parseInt(style["margin-top"]),
            bottom: parseInt(style["margin-bottom"])
        };
        var padding = {
            left: parseInt(style["padding-left"]),
            right: parseInt(style["padding-right"]),
            top: parseInt(style["padding-top"]),
            bottom: parseInt(style["padding-bottom"])
        };
        var border = {
            left: parseInt(style["border-left"]),
            right: parseInt(style["border-right"]),
            top: parseInt(style["border-top"]),
            bottom: parseInt(style["border-bottom"])
        };
        box = {
            left: box.left - margin.left,
            right: box.right - margin.right - padding.left - padding.right,
            top: box.top - margin.top,
            bottom: box.bottom - margin.bottom - padding.top - padding.bottom - border.bottom
        };
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    }
}
