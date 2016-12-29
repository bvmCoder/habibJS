/* eslint-disable */

import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
let cx = setCssModule.bind(styles);
export default class TreeNode extends React.Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
    }
    renderWithCheckBox() {
        const classNames = setCssModule('tree-node-content-checkbox', this.props.className);
        return (<div className={styles[classNames]}>
                <div className={styles['node-check-icon']}>
                    <input type='checkbox' onChange={this.onCheckboxClick.bind(this)} checked={this.props.checked}/>
                </div>
                <div className={styles['node-title']} onClick={this.onCollpaseExpandClick.bind(this)}>
                    <div className={styles['li-content-checkbox']}>{this.props.title}</div>
                </div>
            </div>);
    }
    renderWithoutCheckBox() {
        const classNames = setCssModule('tree-node-content', this.props.className);
        const iconClassName = this.props.hasChildren ? (this.props.collapsed ? 'icon-expand' : 'icon-collapse') : 'icon-nochild';
        return (<div className={styles[classNames]} onClick={this.onCollpaseExpandClick.bind(this)}>
                <div className={styles['node-check-icon']}>
                   <span className={styles[iconClassName]}></span>
                </div>
                <div className={styles['node-title']} onClick={this.onCollpaseExpandClick.bind(this)}>
                    <div className={styles['li-content']}>{this.props.title}</div>
                </div>
            </div>);
    }
    render() {
        return this.props.checkbox ? this.renderWithCheckBox() : this.renderWithoutCheckBox();
    }
    onCheckboxClick(event) {
        this.props.onNodeCheckboxClick(event);
    }
    onCollpaseExpandClick(event) {
        this.props.onCollpaseExpandClick(event);
    }
}
TreeNode.propTypes = {
    checkbox: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    collapsed: React.PropTypes.bool,
    hasChildren: React.PropTypes.bool,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onCollpaseExpandClick: React.PropTypes.func,
    onNodeCheckboxClick: React.PropTypes.func,
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
    visible: React.PropTypes.bool,
};
TreeNode.defaultProps = {
    checked: false,
    visible: true,
};
