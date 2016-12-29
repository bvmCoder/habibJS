import * as React from 'react';
import { Component, PropTypes } from 'react';
import { setCssModule } from 'mdc-classnames';
import RenderToBody from './RenderToBody';
import ScrollbarEffect from './ScrollbarEffect';
import KeyUpEventListener from './KeyUpEventListener';
const styles = require('./Modal.less');

const cx = setCssModule.bind(styles);

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.doRender = this.doRender.bind(this);
        this.handleMaskClick = this.handleMaskClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }
    render() {
        return (<RenderToBody render={this.doRender}/>);
    }
    doRender() {
        const { visible, title, children, footer, showCloseButton, width, customizedTitle } = this.props;
        if (!visible) {
            return null;
        }
        const closeButton = showCloseButton ? this.getCloseButton() : null;
        let titleElement;
        if (React.isValidElement(title)) {
            titleElement = React.cloneElement(title, { className: cx('title') });
        } else if (typeof title === 'string') {
            titleElement = (<h3 className={cx('title')}>{title}</h3>);
        }
        const footerElement = React.Children.count(footer) > 0 && React.Children.toArray(footer);
        if (customizedTitle) {
            return (<div className={cx('overlay')} onClick={this.handleMaskClick}>
                    <div className={cx('modal2')} style={width && { width }}>
                        <div className={cx('header')}>{title}</div>
                        <div className={cx('content2')}>{children}</div>
                        <div className={cx('footer2')}>{footerElement}</div>
                    </div>
                    <ScrollbarEffect />
                    <KeyUpEventListener onKeyUp={this.handleKeyUp}/>
                </div>);
        } else {
            return (<div className={cx('overlay')} onClick={this.handleMaskClick}>
                    <div className={cx('modal')} style={width && { width }}>
                        {closeButton}
                        <div className={cx('header')}>{titleElement}</div>
                        <div className={cx('content')}>{children}</div>
                        <div className={cx('footer')}>{footerElement}</div>
                    </div>
                    <ScrollbarEffect />
                    <KeyUpEventListener onKeyUp={this.handleKeyUp}/>
                </div>);
        }
    }
    getCloseButton() {
        return (<button onClick={this.handleRequestClose} className={cx('close')}>
                <span className={cx('close-x')}>X</span>
            </button>);
    }
    handleMaskClick(e) {
        if (e.target === e.currentTarget) {
            this.handleRequestClose();
        }
    }
    handleKeyUp(e) {
        if (!this.props.maskClosable) {
            return;
        }
        if (e.key === 'Escape' || e.keyCode === 27) {
            this.handleRequestClose();
        }
    }
    handleRequestClose() {
        const {onRequestClose} = this.props;
        if (this.props.maskClosable && onRequestClose) {
            onRequestClose();
        }
    }
}
Modal.propTypes = {
    children: PropTypes.node,
    footer: PropTypes.node,
    maskClosable: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
    title: PropTypes.node,
    visible: PropTypes.bool.isRequired,
    width: PropTypes.number
};
Modal.defaultProps = {
    maskClosable: true,
    showCloseButton: true
};
