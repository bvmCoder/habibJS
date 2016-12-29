import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { classSet } from 'mdc-classnames';

const styles = require('./style.less');
const getStyle = function getStyle(elem, value) {
    let view = elem.ownerDocument.defaultView;
    const map = {};
    if (!view || !view.opener) {
        view = window;
    }
    const getAllStyle = view.getComputedStyle(elem);
    if (Array.isArray(value)) {
        const length = value.length;
        let i = 0;
        for (; i < length; i++) {
            map[value[i]] = getAllStyle[value[i]];
        }
        return map;
    }
    const styleValue = getAllStyle[value];
    return styleValue;
};
const getParents = function getParents(elem, targetSelector) {
    // targetSelector is optional
    if (targetSelector === undefined) {
        targetSelector = document;
    }
    const parents = [];
    let pNode = elem.parentNode;
    while (pNode !== targetSelector) {
        const tempNode = pNode;
        parents.push(tempNode);
        pNode = tempNode.parentNode;
    }
    // parents.push(targetSelector);
    return parents;
};
export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.stickyHeaderTop = 0;
        this.state = { tabActive: this.props.tabActive };
        this.handleScroll = this.handleScroll.bind(this);
        this.stickyHeaderTop = 0;
    }
    render() {
        const className = classSet('tabs', this.props.className);
        return (<div className={styles[className]}>
                {this.getMenuItems()}
                <div className={styles['tab-extension']}/>
                {this.getSelectedPanel()}
            </div>);
    }
    componentDidMount() {
        const index = this.state.tabActive;
        const $selectedPanel = this.refs['tab-panel'];
        const $selectedMenu = this.refs[`tab-menu-${index}`];
        if (this.props.onMount) {
            this.props.onMount(index, $selectedPanel, $selectedMenu);
        }
        if (this.props.enableFixedHeader) {
            const node = ReactDOM.findDOMNode(this);
            // console.log(node);
            this.stickyHeaderTop = node.getBoundingClientRect().top - parseInt(this.props.fixedHeaderOffset, 10);
            const scroller = this.scrollParent(node);
            scroller.addEventListener('scroll', this.handleScroll);
        }
    }
    scrollParent(elem) {
        const overflowRegex = /(auto|scroll)/;
        const position = getStyle(elem, 'position');
        const excludeStaticParent = position === 'absolute';
        const scrollParents = [].filter.call(getParents(elem), (el) => {
            if (excludeStaticParent && getStyle(el, 'position') === 'static') {
                return false;
            }
            const overflowState = getStyle(el, ['overflow', 'overflowX', 'overflowY']);
            return (overflowRegex).test(overflowState.overflow + overflowState.overflowX + overflowState.overflowY);
        });
        // scrollParents = (scrollParents === undefined) ? [] : scrollParents[0];
        return position === 'fixed' || !scrollParents.length ? (elem.ownerDocument || document) : scrollParents;
    }
    handleScroll(/*evt*/) {
        const node = ReactDOM.findDOMNode(this);
        //const scroller = evt.currentTarget;
        const position = ((window.pageYOffset > this.stickyHeaderTop) ? 'fixed' : '');
        if (node.style.position !== position) {
            node.style.top = (this.props.fixedHeaderOffset || 0);
            node.style.position = position;
            node.style.zIndex = 9999;
        }
    }
    componentWillUnmount() {
        if (this.props.enableFixedHeader) {
            const node = ReactDOM.findDOMNode(this);
            const scroller = this.scrollParent(node);
            scroller.removeEventListener('scroll', this.handleScroll);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.tabActive && newProps.tabActive !== this.props.tabActive) {
            this.setState({ tabActive: newProps.tabActive });
        }
    }
    setActive(index, e) {
        e.preventDefault();
        const onAfterChange = this.props.onAfterChange;
        const onBeforeChange = this.props.onBeforeChange;
        const $selectedPanel = this.refs['tab-panel'];
        const $selectedTabMenu = this.refs[`tab-menu-${index}`];
        if (onBeforeChange) {
            const cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
            if (cancel === false) {
                return;
            }
        }
        this.setState({ tabActive: index }, () => {
            if (onAfterChange) {
                onAfterChange(index, $selectedPanel, $selectedTabMenu);
            }
        });
    }
    getSelectedPanel() {
        const index = this.state.tabActive - 1;
        const $panel = this.props.children[index];
        return (<article ref='tab-panel' className={styles['tabs-panel-active']}>
                {$panel}
            </article>);
    }
    getMenuItems() {
        if (!this.props.children) {
            throw new Error('Tabs must contain at least one Tabs.Panel');
        }
        if (!Array.isArray(this.props.children)) {
            this.props.children = [this.props.children];
        }
        const $menuItems = this.props.children
            .map(($panel) => { 
                return typeof $panel === 'function' ? $panel() : $panel; 
            })
            .filter(($panel) => $panel)
            .map(($panel, index) => {
                const ref = `tab-menu-${index + 1}`;
                const title = $panel.props.title;
                let disabled = 'false';
                if ($panel.props.disabled) {
                    disabled = $panel.props.disabled;
                }
                let activeTabClass = classSet(this.state.tabActive === (index + 1) ? 'tabs-menu-item-active' : 'tabs-menu-item', '');
                if (disabled === 'true') {
                    activeTabClass = 'tabs-menu-item-disabled';
                }
                /* eslint-disable react/jsx-no-bind */
                return (<li ref={ref} key={index} className={styles[activeTabClass]}>
                        <a onClick={this.setActive.bind(this, index + 1)}> 
                            {title}
                        </a>
                    </li>);
            });
        return (<nav className={styles['tabs-navigation']}>
                <ul className={styles['tabs-menu']}>{$menuItems}</ul>
            </nav>);
    }
}
Tabs.propTypes = {
    children: React.PropTypes.any.isRequired,
    className: React.PropTypes.string,
    enableFixedHeader: React.PropTypes.bool,
    fixedHeaderOffset: React.PropTypes.string,
    onAfterChange: React.PropTypes.func,
    onBeforeChange: React.PropTypes.func,
    onMount: React.PropTypes.func,
    tabActive: React.PropTypes.number
};
