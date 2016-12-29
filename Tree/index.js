import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
import TreeNode from './TreeNode';
const styles = require('./style.less');

export default class Tree extends React.Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
        this._hasRootNode = this.props.title;
        this.state = { allCollapsed: true, update: false };
        const $root = { checked: this.props.checked, children: [], id: this.props.id, isCollapsed: !this.props.expanded, name: this.props.name, other: this.props, parent: null,
            rootRequired: this._hasRootNode, title: this.props.title, visible: this.props.visible };
        $root.children = this.getTree(this.getValidArray(this.props.children), $root);
        this._tree = $root;
        this.onAllExpandCollapseClick = this.onAllExpandCollapseClick.bind(this);
    }
    render() {
        const classNames = this.props.visible ? setCssModule('tree', this.props.className) : setCssModule('hidden', this.props.className);
        const allCollapseExpandClassName = !this.props.showAllCollapseExpand ? 'all-coll-exp-hidden' : '';
        return (<div className={styles[classNames]}>
                <div className={styles[allCollapseExpandClassName]}>
                   <a className={styles['expand-collapse-all']} title={this.state.allCollapsed ? 'Expand all' : 'Collapse all'} onClick={this.onAllExpandCollapseClick}><span className={styles[this.state.allCollapsed ? 'icon-expand-all' : 'icon-collapse-all']} /></a>
                </div>
                {this._tree.rootRequired ? this.getTreeWithRootNode() : this.getSubTree(this._tree.children)}
            </div>);
    }
    getTreeWithRootNode() {
        return (<ul className={styles['tree-node-root']}>
                  <li>    
                    <TreeNode title={this._tree.title} checkbox={this.props.checkbox} checked={this._tree.checked} hasChildren={this._tree.children.length > 0} 
                        collapsed={this._tree.isCollapsed} 
                        onCollpaseExpandClick={this.nodeCollpaseExpandClick.bind(this, this._tree)} //eslint-disable-line react/jsx-no-bind 
                        onNodeCheckboxClick={this.nodeNodeCheckboxClick.bind(this, this._tree)} //eslint-disable-line react/jsx-no-bind  
                    />
                    {this.getSubTree(this._tree.children)}
                  </li>
            </ul>);
    }
    nodeCollpaseExpandClick(node) {
        node.isCollapsed = !node.isCollapsed;
        this.setState({ update: true });
        if (this.props.onCollpaseExpandClick) {
            this.props.onCollpaseExpandClick(node);
        }
    }
    nodeNodeCheckboxClick(node, event) {
        node.checked = event.currentTarget.checked;
        if (this.props.inheritState) {
            this.resetCheckedFlag(node.children, event.currentTarget.checked);
            this.resetParentCheckedFlag(node, event.currentTarget.checked);
        }
        this.setState({ update: true });
        if (this.props.onNodeCheckboxClick) {
            this.props.onNodeCheckboxClick(node);
        }
    }
    getSubTree(children) {
        const $nodes = this.getValidArray(children).map((tr, index) => {
            let $className = tr.parent.isCollapsed ? 'tree-node-hidden' : 'tree-node';
            if (!tr.parent.rootRequired) {
                $className = 'tree-node-root';
            }
            if (!tr.visible) {
                $className = 'hidden';
            }
            return (<ul className={styles[$className]} key={index}>
                   <li>  
                    <TreeNode title={tr.title} checkbox={this.props.checkbox} checked={tr.checked} 
                        hasChildren={tr.children.length > 0} collapsed={tr.isCollapsed} visible={tr.visible} 
                        onCollpaseExpandClick={this.nodeCollpaseExpandClick.bind(this, tr)} //eslint-disable-line react/jsx-no-bind 
                        onNodeCheckboxClick={this.nodeNodeCheckboxClick.bind(this, tr)} //eslint-disable-line react/jsx-no-bind
                    />
                    {this.getSubTree(tr.children)}
                   </li>
                 </ul>);
        });
        return $nodes;
    }
    onAllExpandCollapseClick(event) {
        event.stopPropagation();
        this._tree.isCollapsed = !this.state.allCollapsed;
        this.resetCollpaseFlag(this._tree.children);
        this.setState({ allCollapsed: !this.state.allCollapsed });
    }
    resetCollpaseFlag(children) {
        children.forEach((tr) => {
            tr.isCollapsed = !this.state.allCollapsed;
            this.resetCollpaseFlag(tr.children);
        });
    }
    resetParentCheckedFlag(node, checked) {
        if (node.parent !== null) {
            const allSiblingsChecked = node.parent.children.filter((ch) => {
                return !ch.checked;
            }).length <= 0;
            node.parent.checked = allSiblingsChecked;
            this.resetParentCheckedFlag(node.parent, checked);
        }
    }
    resetCheckedFlag(children, checked) {
        children.forEach((tr) => {
            tr.checked = checked;
            this.resetCheckedFlag(tr.children, checked);
        });
    }
    getValidArray(children) {
        const $children = children || [];
        return Array.isArray($children) ? $children : [$children];
    }
    getTree(children, parent) {
        return children.map((tr) => {
            const $ch = { checked: tr.props.checked, children: [], id: tr.props.id, isCollapsed: !this.props.expanded, name: tr.props.name,
                other: tr.props, parent, rootRequired: true, title: tr.props.title, visible: tr.props.visible };
            $ch.children = this.getTree(this.getValidArray(tr.props.children), $ch);
            return $ch;
        });
    }
}

Tree.propTypes = {
    checkbox: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
    className: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    id: React.PropTypes.string,
    inheritState: React.PropTypes.bool,
    name: React.PropTypes.string,
    onCollpaseExpandClick: React.PropTypes.func,
    onNodeCheckboxClick: React.PropTypes.func,
    showAllCollapseExpand: React.PropTypes.bool,
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    visible: React.PropTypes.bool
};

Tree.defaultProps = {
    checkbox: false,
    checked: false,
    expanded: false,
    inheritState: true,
    showAllCollapseExpand: false,
    visible: true
};
