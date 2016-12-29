import * as React from 'react';
import Popover from '../Popover/index';
import Content from '../Popover/Content';
import PopoverTrigger from '../Popover/Trigger';
const styles = require('./style.less');
import { setCssModule } from 'mdc-classnames';
const cx = setCssModule.bind(styles);

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            align: this.props.align ? this.props.align : "top-right"
        };
    }
    componentWillReceiveProps(nextProps) {
        // only update if component manages its own state
        if (!this.props.readonly) {
            if (nextProps.align !== this.props.align) {
                this.setState({ align: nextProps.align });
            }
        }
    }
    render() { //eslint-disable-line max-statements
        return (
        <div>
        <Popover trigger="hover" toolTips align={this.state.align}>
        <PopoverTrigger>
        {this.props.tooltipTrigger}
        </PopoverTrigger>
        <Content>
            <div className={cx(styles.toolTipstext)} ref='tooltipstext'>
            {this.props.tooltipText}
            </div>
        </Content>
        </Popover>
        </div>
        );
    }
}
Tooltip.propTypes = {
    tooltipText: React.PropTypes.string,
    tooltipTrigger: React.PropTypes.any,
    align: React.PropTypes.oneOf(['top-right', 'top-left', 'right', 'left', 'bottom-right', 'bottom-left', 'right-top', 'left-top', 'right-bottom', 'left-bottom'])
};
Popover.defaultProps = {
    align: 'top-right'
};