const React = require("react");
const { PropTypes, Component } = React;
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export class ButtonGroupItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, this, ...arguments);
        }
        this.props.select(this.props.index);
    }
    render() {
        let myclass = '';
        if (this.props.type === 'big') {
            myclass = 'neptune_button_item_big';
            if (this.props.selected === true) {
                myclass = cx(myclass, 'selected_big');
            } else if (this.props.selectedIndex === (this.props.index - 1)) {
                myclass = cx(myclass, 'selected_big_next');
            }
        } else {
            myclass = 'neptune_button_item_small';
            if (this.props.selected === true) {
                myclass = cx(myclass, 'selected_small');
            } else if (this.props.selectedIndex === (this.props.index - 1)) {
                myclass = cx(myclass, 'selected_small_next');
            }
        }
        return (<button className={cx(myclass, this.props.className)} selected={this.props.selected || false} onClick={this.handleClick} style={this.props.index === 0
            ? { borderLeft: 'none', paddingLeft: this.props.type === 'big' ? '20px' : '10px' }
            : null}>
                {this.props.children}
            </button>);
    }
}

export class ButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {
        if (this.props.defaultIndex) {
            this.setState({
                selectedIndex: this.props.defaultIndex
            });
        }
    }
    onChange(nextIndex) {
        if (this.props.onChange) {
            this.props.onChange(this.state.selectedIndex, nextIndex, ...arguments);
        }
        this.setState({
            selectedIndex: nextIndex
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }
    }
    render() {
        let children = this.props.children.map((child, index) => {
            return React.cloneElement(child, {
                index,
                key: index,
                select: this.onChange,
                selected: this.state.selectedIndex === index ? true : false,
                selectedIndex: this.state.selectedIndex,
                type: this.props.type || 'small'
            });
        });
        return (<div style={this.props.style} className={this.props.style === 'big'
            ? cx('neptune_button_group_big', this.props.className)
            : cx('neptune_button_group_small', this.props.className)}>
                {children}
            </div>);
    }
}

ButtonGroup.propTypes = {
    type: PropTypes.oneOf(['small', 'big'])
};
