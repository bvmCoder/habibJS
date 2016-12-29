const React = require("react");
const { PropTypes, Component } = React;
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');

const cx = setCssModule.bind(styles);

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        for (var key in this.props) {
            if (key === 'secondary') {
                console.warn("Please note 'secondary' class has been deprecated. Use default instead.");
            }
        }
    }

    render() {
        const elemProps = {};
        if (this.props.disabled) {
            elemProps.disabled = true;
        }
        let classes = cx(this.props.className, {
            button: true,
            disabled: this.props.disabled,
            large: this.props.size && this.props.size === 'large',
            primary: this.props.primary,
            secondary: this.props.secondary,
            small: this.props.size && this.props.size === 'small'
        });

        return (
            <button className={classes} {...elemProps} type='button' onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event, this);
        }
    }
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};
