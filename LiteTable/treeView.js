/* eslint-disable */

const $ = require('jquery'); // eslint-disable-line
const getCurrentRow = function ($elem) {
    var $parent = $elem.parent();
    return $parent[0].tagName === "TR" ? $parent : getCurrentRow($parent);
};
const getParentRow = function ($row, level) {
    var $preRows = $row.prevAll();
    for (var j = 0; j < $preRows.length; j++) {
        if ($preRows.eq(j).attr("depth") < level) {
            return $preRows.eq(j);
        }
    }
    return null;
};
const toggleRow = function ($btn) {
    var toggleBtn = function ($btn, expandFlag) {
        return expandFlag ? $btn.removeClass('togglePlus') : $btn.addClass('togglePlus');
    };
    var toggleRows = function ($theImg, expandFlag) {
        var $currentRow = getCurrentRow($theImg);
        var srcLevel = +$currentRow.attr('depth');
        var $rows = $currentRow.nextAll();
        var $row;
        for (var i = 0; i < $rows.length; i++) {
            $row = $rows.eq(i);
            var level = $row.attr('depth');
            if (level <= srcLevel)
                break;
            if (!expandFlag) {
                $row.addClass('mdcHide');
                continue;
            }
            var $parentRow = getParentRow($row, level);
            if (!$parentRow.hasClass('mdcHide') && !$parentRow.find('.toggleBtn').hasClass('togglePlus'))
                $row.removeClass('mdcHide');
        }
    };
    var isExpand = $btn.hasClass('togglePlus');
    toggleBtn($btn, isExpand);
    toggleRows($btn, isExpand);
};
const hideLeaf = function ($trs) {
    for (let i = 0; i < $trs.length; i++) {
        const $tr = $trs.eq(i);
        if ($tr.next().attr('depth') <= $tr.attr('depth') || $tr.next().length === 0) {
            $tr.children("td:eq(0)").find('.toggleBtn').css('visibility', 'hidden');
        }
    }
};
const addButtonAndSetDepth = function (api, identSize, $tableNode) {
    $tableNode.find('tbody > tr.group').attr('depth', 0);
    var $trs = $('tbody > tr[role="row"]', $tableNode);
    var origPaddingLeft = $trs.eq(0).css('padding-left').replace('px', '') * 1;
    api.data().each(function (data, i) {
        var depth = data['depth'];
        var $tr = $trs.eq(i);
        $tr.attr('depth', depth);
        var $btn = $('<span />').addClass('toggleBtn');
        var paddingLeft = origPaddingLeft + depth * identSize;
        $tr.children("td:eq(0)").css('padding-left', paddingLeft).prepend($btn);
    });
    hideLeaf($trs);
};
const syncRows = function ($wrapper, $srcTableNode) {
    const $leftTableNode = $wrapper.find('.DTFC_LeftBodyWrapper').find('.neptuneTable');
    const $bodyTableNode = $wrapper.find('.dataTables_scrollBody').find('.neptuneTable');
    const $rightTableNode = $wrapper.find('.DTFC_RightBodyWrapper').find('.neptuneTable');
    if ($leftTableNode.length === 0 && $rightTableNode.length === 0)
        return;
    const $destTableNode = $leftTableNode.length === 0 ? $rightTableNode : $bodyTableNode.add($rightTableNode);
    var $trs = $('tbody > tr[role="row"]', $srcTableNode);
    for (let i = 0; i < $trs.length; i++) {
        var $destTr = $destTableNode.find('tbody > tr[role="row"]:eq(' + i + ')');
        if ($trs.eq(i).hasClass('mdcHide')) {
            $destTr.addClass('mdcHide');
        }
        else {
            $destTr.removeClass('mdcHide');
        }
    }
};
const addToggleButton = function ($wrapper, api, identSize, $tableNode) {
    if ($tableNode.length === 0)
        return;
    addButtonAndSetDepth(api, identSize, $tableNode);
    $tableNode.on('click', '.toggleBtn', function () {
        toggleRow($(this));
        syncRows($wrapper, $tableNode);
        api.columns.adjust();
    });
};
const toggleAll = function ($tableNode, expandFlag) {
    $tableNode.find("tbody > tr[depth='1']").find(".toggleBtn").each(function () {
        var $btn = $(this);
        if (expandFlag === $btn.hasClass("togglePlus")) {
            toggleRow($btn);
        }
    });
};
const addToggleAllButton = function ($wrapper, api, $bodyWrapper) {
    const $tableNode = $bodyWrapper.find('.neptuneTable');
    const $btn = $('<a class="toggleAllBtn" href="javascript:void(0)">COLLAPSE ALL</a>');
    $btn.click(function () {
        const $this = $(this);
        if ($this.text() === 'COLLAPSE ALL') {
            toggleAll($tableNode, false);
            $this.text('EXPAND ALL');
        }
        else {
            toggleAll($tableNode, true);
            $this.text('COLLAPSE ALL');
        }
        syncRows($wrapper, $tableNode);
        api.columns.adjust();
    });
    const $headerTableNode = $bodyWrapper.prev().find('.neptuneTable');
    $headerTableNode.find("thead > tr:eq(0)").children().eq(0).append('<span class="toggleAllIcon" />').append($btn);
};
const initTreeView = function (wrapper, api, options) {
    const identSize = options.treeView.identSize || 10;
    var $wrapper = $(wrapper);
    const $bodyWrapper = $wrapper.find('.dataTables_scrollBody');
    const $leftBodyWrapper = $wrapper.find('.DTFC_LeftBodyWrapper');
    const $btnBodyWrapper = $leftBodyWrapper.length > 0 ? $leftBodyWrapper : $bodyWrapper;
    addToggleButton($wrapper, api, identSize, $btnBodyWrapper.find('.neptuneTable'));
    if (options.treeView.toggleAll) {
        addToggleAllButton($wrapper, api, $btnBodyWrapper);
    }
};
export default initTreeView;
