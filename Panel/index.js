import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');

export default class Panel extends React.Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
        this.onExpandCollapseClick = this.onExpandCollapseClick.bind(this);
    }
    _renderTitle() {
        const iconClassName = this.props.collapsible ? (this.props.expanded ? 'icon-up' : 'icon-down') : 'hidden'; // eslint-disable-line no-nested-ternary
        if (this.props.collapsible) {
            return (<div>
                    <div className={styles['pull-left']}>
                        <span className={styles[iconClassName]} />
                    </div>
                    <div className={styles['pull-left']}>
                        {this.props.title}
                    </div>
                </div>);
        } else {
            return (<div>
                 {this.props.title}
                </div>);
        }
    }
    _renderSubTitle() {
        if (this.props.subTitle) {
            return (<div>{this.props.subTitle}</div>);
        } else {
            return null;
        }
    }
    render() {
        const classes = setCssModule('panel', this.props.className);
        const accordianContentClassName = this.props.expanded ? 'panel-content-expand' : 'panel-content-collapse';
        const panelTitleClassName = (this.props.collapsible && this.props.disabled !== true) ? 'collapsible-panel-title' : 'panel-title';
        const panelTitleClassName1 = (this.props.disabled === true ? 'filter-disabled' : '');
        const panelTitleClassNameFull = (panelTitleClassName1.length > 0) ? 
            (styles[panelTitleClassName] + ' ' + styles[panelTitleClassName1]) : styles[panelTitleClassName];
        return (<div className={styles[classes]}> 
                <div className={panelTitleClassNameFull} onClick={this.onExpandCollapseClick}>
                   {this._renderTitle()}
                   {this._renderSubTitle()}
                </div>
                <div className={styles[accordianContentClassName]}>{this.props.children}</div>
            </div>);
    }
    onExpandCollapseClick(/*event*/) {
        if (this.props.onExpandCollapseClick) {
            this.props.onExpandCollapseClick(this, this.props.panelId);
        }
        if (this.props.onExpandCollapseAccordionClick) {
            this.props.onExpandCollapseAccordionClick(this, this.props.panelId);
        }
    }
}

Panel.propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    collapsible: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    onExpandCollapseAccordionClick: React.PropTypes.func,
    onExpandCollapseClick: React.PropTypes.func,
    panelId: React.PropTypes.number,
    subTitle: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object])
};

Panel.defaultProps = {
    collapsible: false,
    expanded: true,
    disabled: false
};
