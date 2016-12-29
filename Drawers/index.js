import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setCssModule } from 'mdc-classnames';
import Icon from '../Icon/index';
import { EventListener } from '../Popover/EventListener';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleRootClose = this.handleRootClose.bind(this);
        this.setRefNode = this.setRefNode.bind(this);
    }

    render() {
        const paddingWidth = 60;
        const style = {
            transform: `translate(${this.props.width + paddingWidth}px, 0)`,
            transition: `transform 500ms`,
            width: this.props.width + paddingWidth,
            ['transitionTimingFunction']: 'cubic-bezier (0.67,0.16,0.56,0.85)'
        };
        return (<div ref={this.setRefNode} className={cx('Drawer', this.props.className)} style={style}>
                <EventListener eventName='click' onEvent={this.handleRootClose}/>
                <div className={cx('top')} onClick={this.handleCloseClick}>
                    <div className={styles.close}>
                        <Icon icon='close'/>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={cx('titleBlock')}>
                        <span className={cx('title', styles['Title-Section-Secondary'])}>{this.props.title}</span>
                    </div>
                    {this.props.children}
                </div>
            </div>);
    }
    setRefNode(node) {
        this.x = node;
    }
    componentDidMount() {
        const drawer = ReactDOM.findDOMNode(this.x);
        setTimeout(() => { 
            drawer.style.transform = `translate(0, 0)`; 
        }, 100);
    }
    handleCloseClick() {
        const paddingWidth = 60;
        const drawer = ReactDOM.findDOMNode(this.x);
        setTimeout(() => { 
            drawer.style.transition = `transform 250ms`; 
            drawer.style['transition-timing-function'] = 'cubic-bezier (0.67,0.16,0.56,0.85)'; 
            drawer.style.transform = `translate(${this.props.width + paddingWidth}px, 0)`; 
        }, paddingWidth);

        const self = this;
        if (self.props.onRequestClose) {
            setTimeout(() => { 
                self.props.onRequestClose(); 
            }, 300);
        }
      
    }
    handleRootClose(e) {
        const drawer = ReactDOM.findDOMNode(this.x);
        if (!drawer.contains(e.target)) {
            this.handleCloseClick();
        }
    }
}
Drawer.propTypes = {
    children: React.PropTypes.element,
    className: React.PropTypes.node,
    onRequestClose: React.PropTypes.func,
    title: React.PropTypes.string,
    width: React.PropTypes.number
};

Drawer.defaultProps = {
    width: 300
};