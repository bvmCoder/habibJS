import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setCssModule } from 'mdc-classnames';
const styles = require('./NavItem.less');
const cx = setCssModule.bind(styles);

export default class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const linkData = this.props.linkData;
        const refs = this.refs;
        this.handleClick = this.handleClick.bind(this);
        if (linkData.suppressDefaultOnclick && refs.link) {
            const node = ReactDOM.findDOMNode(refs.link);
            const addEvent = node.addEventListener || node.attachEvent;
            addEvent('click', this.handleClick, true);
        }
    }
    componentWillUnmount() {
        const linkData = this.props.linkData;
        const refs = this.refs;
        if (linkData.suppressDefaultOnclick && refs.link) {
            const node = ReactDOM.findDOMNode(refs.link);
            const removeEvent = node.removeEventListener || node.detachEvent;
            removeEvent('click', this.handleClick, true);
        }
    }
    handleClick(event) {
        event.preventDefault();
        return false;
    }
    render() { // eslint-disable-line max-statements
        const linkData = this.props.linkData;
        const hasUrl = linkData.url !== undefined && linkData.url !== null && linkData.url.length > 0;
        const hasTarget = linkData.target !== undefined && linkData.target !== null && linkData.target.length > 0;
        const showLink = (linkData.disabled !== true && hasUrl && linkData.active !== true);
        if (!showLink) {
            const classes = cx({
                active: linkData.active,
                disabled: linkData.disabled,
                noactive: !linkData.active
            });
            if (linkData.onClick) {
                return <span className={classes} onClick={linkData.onClick}>{linkData.label}{this.getArrow()}</span>; // eslint-disable-line react/jsx-handler-names
            }
            return <span className={classes}>{linkData.label}{this.getArrow()}</span>;
        }
        const target = hasTarget ? linkData.target : '_self';
        const classesItem = cx({
            active: linkData.active,
            noactive: !linkData.active
        });
        if (linkData.onClick) {
            return <a target={target} ref='link' className={classesItem} href={linkData.url} onClick={linkData.onClick}>{linkData.label}</a>; // eslint-disable-line react/jsx-handler-names
        }
        if (linkData.pjax === true) {
            const clickHandler = (event) => {
                const label = linkData.label;
                const url = linkData.url;
                if (!window || !window.history || !window.eventEmitter) {
                    return;
                }
                event.preventDefault();
                history.pushState({}, label, url);
                window.eventEmitter.emit('PJAX.NAVIGATION', { url });
            };
            if (target === '_blank') {
                return <a target={target} className={classesItem} href={linkData.url}>{linkData.label}</a>;
            }
            return <a target={target} className={classesItem} href={linkData.url} onClick={clickHandler}>{linkData.label}</a>;
        }
        return <a target={target} className={classesItem} href={linkData.url}>{linkData.label}</a>;
    }
    
    getArrow() {
        const linkData = this.props.linkData;
        const classesItem = cx({
            iconDown: !this.props.hasChildren && linkData.active
        });
        const classesContainer = cx({
            iconContainer: true
        });
        return (<div className={classesContainer}><i className={classesItem} /></div>);
    }
}

NavLink.propTypes = {
    linkData: React.PropTypes.object
};
