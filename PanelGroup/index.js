import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
import Panel from '../Panel';
const styles = require('./style.less');
export default class PanelGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const className = setCssModule('panel-group', this.props.className);
        return (<div className={styles[className]}>
            {this.getGroupPanels()}
            </div>);
    }
    getGroupPanels() {
        if (!this.props.children) {
            throw new Error('PanelGroup must contain at least one Panel');
        }
        if (!Array.isArray(this.props.children)) {
            this.props.children = [this.props.children];
        }
        const $groupPanels = (this.props.children).map((panel, index) => {
            return (<Panel key={index} title={panel.props.title} className={panel.props.className} subTitle={panel.props.subTitle}>
            {panel.props.children}
        </Panel>);
        });
        return $groupPanels;
    }
}
PanelGroup.propTypes = {
    children: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
};
