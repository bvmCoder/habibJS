import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Children } from 'react';
import Label from '../Label/Index';
import { EventListener } from './EventListener';
const _ = require('lodash');
const styles = require('./style.less');
import { setCssModule } from 'mdc-classnames';
const cx = setCssModule.bind(styles);

const isText = (child) => {
    if (child && child.type) {
        return false;
    }
    return true;
};

const matchElement = (name, el) => {
    const className = styles[name];
    return el.getElementsByClassName(className) ? el.getElementsByClassName(className)[0] : undefined;
};

const setContainerPosition = (align, toolTips, el, container) => { // eslint-disable-line complexity, max-statements
    const containerElement = matchElement('container', el);
    const contentElement = matchElement('content', el);
    if (toolTips) {
        //const circleElement = matchElement('circle', el);
        const titleElement = matchElement('toolTipsTitle', el);
        const className = `pos_${align.replace('-', '_')}`;
        const leftPadding = 16;
        const topPadding = 21;
        contentElement.classList.add(styles[className]);
        const titleWidth = titleElement.offsetWidth;
        const titleHeight = titleElement.offsetHeight;
        const popInWindows = document.getElementById('popoverTest').children[0];
        contentElement.style.width = `${popInWindows.offsetWidth}px`;
        if (popInWindows.remove) {
            popInWindows.remove();
        } else {
            popInWindows.removeNode(true);
        }
        const contentHeight = contentElement.offsetHeight;
        const contentWidth = contentElement.offsetWidth;
        const overlayHeight = contentElement.offsetHeight - 2 * topPadding;
        const overlayWidth = contentElement.offsetWidth - 2 * leftPadding;
        switch (align) {
            case 'top-right':
                contentElement.style.top = `-${contentHeight + 6 + 3}px`;
                contentElement.style.left = `${titleWidth / 2 - 24}px`;
                contentElement.classList.add(styles.triangle);
                break;
            case 'top-left':
                contentElement.style.top = `-${contentHeight + 6 + 3}px`;
                contentElement.style.left = `-${overlayWidth + 2 * leftPadding - 24 - titleWidth / 2}px`;
                contentElement.classList.add(styles.pos_top_left);
                break;
            case 'bottom-right':
                contentElement.style.left = `${titleWidth / 2 - 24}px`;
                contentElement.style.top = `${titleHeight + 6 + 3}px`;
                contentElement.classList.add(styles.pos_bottom_right);
                break;
            case 'bottom-left':
                contentElement.style.left = `-${overlayWidth + 2 * leftPadding - 24 - titleWidth / 2}px`;
                contentElement.style.top = `${titleHeight + 6 + 3}px`;
                contentElement.classList.add(styles.pos_bottom_left);
                break;
            case 'right':
                contentElement.style.left = `${titleWidth + 7 + 4}px`;
                contentElement.style.top = `-${titleHeight + 6 - 9}px`;
                contentElement.classList.add(styles.pos_right);
                break;
            case 'left':
                contentElement.style.left = `-${contentWidth + 7 + 5}px`;
                contentElement.style.top = `-${titleHeight + 6 - 9}px`;
                contentElement.classList.add(styles.pos_left);
                break;
            case 'left-bottom':
                contentElement.style.left = `-${contentWidth + 7 + 5}px`;
                contentElement.style.top = `-${titleHeight + 6 - 9}px`;
                contentElement.classList.add(styles.pos_left_bottom);
                break;
            case 'right-bottom':
                contentElement.style.left = `${titleWidth + 7 + 4}px`;
                contentElement.style.top = `-${titleHeight + 6 - 9}px`;
                contentElement.classList.add(styles.pos_right_bottom);
                break;
            case 'left-top':
                contentElement.style.left = `-${contentWidth + 7 + 5}px`;
                contentElement.style.top = `-${overlayHeight + topPadding - titleHeight}px`;
                contentElement.classList.add(styles.pos_left_top);
                break;
            case 'right-top':
                contentElement.style.left = `${titleWidth + 7 + 4}px`;
                contentElement.style.top = `-${overlayHeight + topPadding - titleHeight}px`;
                contentElement.classList.add(styles.pos_right_top);
                break;
            default:
                break;
        }
    } else {
        el.style.padding = `0px`;
    }
    if (container && !toolTips) {
        if (containerElement) {
            if (toolTips) {
                containerElement.style.padding = `0px`;
            }
            contentElement.style.top = `${containerElement.clientHeight + 1}px`;
            if (align === 'left') {
                contentElement.style.left = `-${contentElement.clientWidth - containerElement.clientWidth}px`;
            }
        }
    }
};

const isOneOf = (one, of) => {
    return of.indexOf(one) > -1;
};

const contain = (container, el) => {
    do {
        if (el.nodeName === container.nodeName && el.nodeName === 'path') {
            return true;
        }
        container = container && container.children && container.children[0];
    } while (container);
    return false;
};

const contains = (function () {
    const canUseDOM = !!(typeof window !== 'undefined' &&
        window.document &&
        window.document.createElement);
    const root = canUseDOM && document.documentElement;
    if (root && root.contains) {
        return function (context, node) {
            return context.contains(node);
        };
    } else if (root && root.compareDocumentPosition) {
        return function (context, node) {
            return context === node || context.compareDocumentPosition(node) === 16;
        };
    } else {
        return function (context, node) {
            if (node) {
                do {
                    if (node === context) {
                        return true;
                    }
                } while (node === node.parentNode);
            }
            return false;
        };
    }
})();

export default class Popover extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOverlayShown: false };
        this.toggle = this.toggle.bind(this);
        this.handleMouseOver = (e) => this.handleMouseOverOut(e, true);
        this.handleMouseOut = (e) => this.handleMouseOverOut(e, false);
    }
    componentDidMount() {
        this.componentDidUpdate();
        if (Popover.registry.indexOf(this) === -1) {
            Popover.registry.push(this);
        }
    }
    componentWillUnmount() {
        if (Popover.registry.indexOf(this) !== -1) {
            Popover.registry.splice(Popover.registry.indexOf(this), 1);
        }
    }
    componentDidUpdate() {
        this.domHandle();
    }
    render() { //eslint-disable-line max-statements
        const { trigger, children/*, toolTips*/ } = this.props;
        let child = children;
        let content = null;
        if (Children.count(children) > 1) {
            child = _.filter(Children.toArray(children), (item) => {
                return item.type.getName() === 'trigger';
            })[0];
            child = child.props.children;
            content = _.filter(Children.toArray(children), (item) => {
                return item.type.getName() === 'content';
            })[0];
            content = content.props.children;
        }
        const props = {};
        if (isOneOf('click', trigger)) {
            props.onClick = this.toggle;
        }
        if (isOneOf('hover', trigger)) {
            props.onMouseOver = this.handleMouseOver;
            props.onMouseOut = this.handleMouseOut;
        }
        const component = React.createElement('div', null, child);
        return React.cloneElement(component, Object.assign(props, {
            children: this.renderChildren(component, content),
            className: cx({ overlayShown: this.state.isOverlayShown }, styles.component, this.props.className),
            ref: (ctrl) => { 
                this._rootControl = ctrl; 
            }
        }));
    }
    toggle(e) {
        if (this.state.isOverlayShown) {
            if (!contains(matchElement('content', this._rootControl), e.target)) {
                this.hide();
            }
        } else if (!this.props.disable) {
            const onTriggered = this.props.onTriggered;
            if (onTriggered) {
                onTriggered();
            }
            this.show();
        }
    }
    show() {
        const that = this; //eslint-disable-line consistent-this
        Popover.registry.map((popover) => {
            if (popover !== that) {
                popover.hide();
            }
        });
        this.setState({ isOverlayShown: true });
    }
    hide() {
        const duration = 250;
        const refs = this.refs;
        const that = this; //eslint-disable-line consistent-this
        const onClosed = this.props.onClosed;
        if (refs.overlay) {
            setTimeout(() => {
                that.setState({ isOverlayShown: false });
                if (onClosed) {
                    onClosed();
                }
            }, duration);
            refs.overlay.style.opacity = 0;
            if (refs.title) {
                refs.overlay.style.borderTopColor = '#F1F1F1';
                refs.title.style.opacity = 0;
            }
        } else {
            this.setState({ isOverlayShown: false });
            if (onClosed) {
                onClosed();
            }
        }
    }
    renderChildren(component, content) { //eslint-disable-line max-statements
        const { toolTips, additionalContentClassName, additionalCircleClassName, trigger } = this.props;
        const that = this; //eslint-disable-line consistent-this
        let overlay = this.props.overlay;
        if (content) {
            overlay = content;
        }
        let children = (<div className={cx(styles.title) }>
            {component}
        </div>);
        const compChildren = component.props.children;
        if (toolTips) {
            children = isText(compChildren) ?
                (<div className={styles.toolTipsTitle}><Label>{compChildren}</Label></div>) :
                (<div className={styles.toolTipsTitle}>{compChildren}</div>);
        }
        if (this.state.isOverlayShown) {
            const eventListener = (<EventListener eventName={trigger} onEvent={ function (e) { 
                that.rootClose(e);
            }}/>);
            const titleStyle = {
                opacity: 0,
                transition: 'opacity 250ms',
                ['transition-timing-function']: 'cubic-bezier (0.25,0.21,0.25,1)'
            };
            const addOn = (<div>
                <div className={cx(styles.title, styles.container) } style={titleStyle} ref='title'>
                    {component}
                </div>
            </div>);
            const showTextStyle = {
                position: 'absolute',
                top: '0'
            };
            const showText = (<div>
                <div className={cx(styles.title) } style={showTextStyle}>
                    {compChildren}
                </div>
            </div>);
            const overlayTransition = {
                borderTopColor: toolTips ? '#ABABAB' : '#F1F1F1',
                opacity: 0,
                transition: 'opacity 250ms',
                ['transition-timing-function']: 'cubic-bezier (0.25,0.21,0.25,1)'
            };
            let overlayAddOn = (<div className={cx(styles.content, additionalContentClassName) } style={overlayTransition} ref='overlay'>
                {overlay}
            </div>);
            if (toolTips) {
                const contentStyle = Object.assign({ height: 'auto', width: 'auto' }, overlayTransition);
                overlayAddOn = (<div className={cx(additionalContentClassName, styles.content, styles.tootips) } style={contentStyle} ref='overlay'>
                    <div className={cx(additionalCircleClassName, styles.circle, styles.icon) }>&nbsp; </div>
                    {overlay}
                </div>);
                let div = document.getElementById('popoverTest');
                div = div ? div : document.createElement('div');
                div.setAttribute('id', 'popoverTest');
                if (trigger === 'hover') {
                    div.style.maxWidth = '400px';
                }
                document.body.appendChild(div);
                ReactDOM.render(overlayAddOn, document.getElementById('popoverTest'));
                children = _([]).union([children, overlayAddOn, eventListener]).flatten().filter(undefined).value();
            } else {
                children = _([]).union([showText, addOn, overlayAddOn, eventListener]).flatten().filter(undefined).value();
            }
        }
        return children;
    }
    rootClose(e) {
        if (this._rootControl && !contains(this._rootControl, e.target) && !contain(this._rootControl, e.target)) {
            this.hide();
        }
    }
    handleMouseOver(e) {
        const onTriggered = this.props.onTriggered;
        if (onTriggered) {
            onTriggered();
        }
        this.handleMouseOverOut(e, true);
    }
    handleMouseOut(e) {
        this.handleMouseOverOut(e, false);
    }
    handleMouseOverOut(e, isShow) {
        const target = e.currentTarget;
        const related = e.relatedTarget || e.nativeEvent.toElement;
        if (!related || related !== target && !contains(target, related)) {
            if (isShow) {
                this.handleDelayedShow();
            } else {
                this.handleDelayedHide();
            }
        }
    }
    handleDelayedShow() {
        if (this._hoverHideDelay) {
            clearTimeout(this._hoverHideDelay);
            this._hoverHideDelay = null;
            return;
        }
        if (this.state.isOverlayShown || this._hoverShowDelay) {
            return;
        }
        const delay = 100;
        this._hoverShowDelay = setTimeout(() => {
            this._hoverShowDelay = null;
            this.show();
        }, delay);
    }
    handleDelayedHide() {
        if (this._hoverShowDelay) {
            clearTimeout(this._hoverShowDelay);
            this._hoverShowDelay = null;
            return;
        }
        if (!this.state.isOverlayShown || this._hoverHideDelay) {
            return;
        }
        const delay = 100;
        this._hoverHideDelay = setTimeout(() => {
            this._hoverHideDelay = null;
            this.hide();
        }, delay);
    }
    domHandle() {
        if (this.state.isOverlayShown) {
            setContainerPosition(this.props.align, this.props.toolTips, this._rootControl, this._container);
            const refs = this.refs;
            if (refs.overlay) {
                refs.overlay.style.opacity = 1;
            }
            if (refs.title) {
                refs.title.style.opacity = 1;
                const duration = 150;
                setTimeout(() => {
                    refs.overlay.style.borderTopColor = '#AbABAB';
                }, duration);
            }
        } else {
            this._container = this._rootControl;
        }
    }
}
Popover.propTypes = {
    additionalCircleClassName: React.PropTypes.string,
    additionalContentClassName: React.PropTypes.string,
    align: React.PropTypes.oneOf(['top-right', 'top-left', 'right', 'left', 'bottom-right', 'bottom-left', 'right-top', 'left-top', 'right-bottom', 'left-bottom']),
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    disable: React.PropTypes.bool,
    height: React.PropTypes.number,
    overlay: React.PropTypes.node.isRequired,
    toolTips: React.PropTypes.bool,
    trigger: React.PropTypes.oneOf(['click', 'hover']),
    width: React.PropTypes.number
};
Popover.registry = [];
Popover.defaultProps = {
    align: 'top-right',
    disable: false,
    toolTips: true
};
