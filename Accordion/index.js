import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
import Panel from '../Panel';
const styles = require('./style.less');

export default class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.onExpandCollapseClick = this.onExpandCollapseClick.bind(this);
        if (!this.props.children) {
            throw new Error('Accordion must contain at least one Panel');
        }
        const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        const accordionPanelStates = children.map((panel, index) => {
            return { Expanded: this.props.activePanel === index, PanelId: index };
        });
        this.state = { panelStates: accordionPanelStates };
    }
    render() {
        const className = setCssModule('accordion-container', this.props.className);
        return (
            <div className={styles[className]}>
                {this.getAccordionPanels()}
            </div>
        );
    }
    onExpandCollapseClick(panel, panelId) {
        const panelStates = this.state.panelStates.map((pState) => {
            if (pState.PanelId === panelId) {
                pState.Expanded = !pState.Expanded;
            } else if (!this.props.multiExpand) {
                pState.Expanded = false;
            }
            return pState;
        });
        this.setState({ panelStates });
        if (this.props.onItemExpandCollapse) {
            this.props.onItemExpandCollapse(panel);
        }
    }
    getAccordionPanels() {
        const panelStates = this.state.panelStates;
        const _panels = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        const $accordionPanels = _panels.map((panel, index) => {
            const panelState = (panelStates.filter((pState) => {
                return pState.PanelId === index;
            }))[0];
            const expanded = panelState ? panelState.Expanded || false : false;
            return (<Panel key={index} title={panel.props.title} className={panel.props.className} collapsible expanded={expanded} subTitle={panel.props.subTitle} onExpandCollapseAccordionClick={this.onExpandCollapseClick} onExpandCollapseClick={panel.props.onExpandCollapseClick} panelId={index} disabled={panel.props.disabled ? panel.props.disabled : false}>
            {panel.props.children}
            </Panel>);
        });
        return $accordionPanels;
    }
}

Accordion.propTypes = {
    activePanel: React.PropTypes.number,
    children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
    className: React.PropTypes.string,
    multiExpand: React.PropTypes.bool,
    onItemExpandCollapse: React.PropTypes.func
};
