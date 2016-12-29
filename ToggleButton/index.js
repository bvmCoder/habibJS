import * as React from 'react';
import { classSet } from 'mdc-classnames';
const styles = require('./style.less');

export default class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonToggle = this.onButtonToggle.bind(this);
        let selected = this.props.selected;
        if (typeof this.props.defaultPressedIndex !== 'undefined') {
            selected = this.props.defaultPressedIndex;
            console.warn("'defaultPressedIndex' prop is deprecated and will be removed. Please use 'selected' prop instead");
        }
        this.state = { selected };
    }
    render() {
        const childrenCount = React.Children.count(this.props.children);
        const toggleButton = classSet('toggle-button', '');
        const children = React.Children.map(this.props.children, (el, indx) => {
            let childClassName = classSet('toggle-button-horizontal', '');
            if (indx === 0) {
                childClassName = classSet('toggle-button-left-horizontal', '');
            } else if (indx === childrenCount - 1) {
                childClassName = classSet('toggle-button-right-horizontal', '');
            }
            const childProps = {
                className: styles[childClassName],
                key: `item-${indx}`,
                mountIndex: indx,
                onClick: this.onButtonToggle,
                primary: this.state.selected === indx
            };
            if (this.state.selected === indx) {
                childClassName = classSet('toggle-button-selected', '');
                childProps.className += (' ' + styles[childClassName]);
            }
            if (this.props.disabled !== undefined && this.props.disabled !== false) {
                childProps.disabled = true;
            }
            return React.cloneElement(el, childProps, el.props.children);
        });
        return (<div className={styles[toggleButton]}>
                {children}
            </div>);
    }
    onButtonToggle(event, component) {
        if (this.props.onToggle) {
            this.props.onToggle(component.props.mountIndex);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.defaultPressedIndex !== 'undefined') {
            this.setState({ selected: nextProps.defaultPressedIndex });
            console.warn("'defaultPressedIndex' prop is deprecated and will be removed. Please use 'selected' prop instead");
        } else {
            this.setState({ selected: nextProps.selected });
        }
    }
}

ToggleButton.propTypes = {
    defaultPressedIndex: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.number.isRequired
};
