const React = require("react");
const { PropTypes, Component } = React;
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleNoop = this.handleNoop.bind(this);
        this.state = {
            checked: props.checked
        };
        if (this.props.onclick) {
            console.warn("CheckBox 'onclick' event has been deprecated. Please use onChange event instead.");
        }
    }
    componentWillReceiveProps(nextProps) {
        // only update if component manages its own state
        if (!this.props.readonly) {
            if (nextProps.checked !== this.props.checked || nextProps.disabled !== this.props.disabled) {
                this.setState({ checked: nextProps.checked });
            }
        }
    }
    render() {
        const { name, text, value, disabled } = this.props;
        const checked = this.props.readonly ? this.props.checked : this.state.checked;

        const extraProps = {};
        if (checked === true) {
            extraProps.checked = true;
        } else {
            extraProps.checked = false;
        }
        if (disabled === true) {
            extraProps.disabled = true;
        }
        const classes = cx(this.props.className, {
            checkbox: true,
            disabled
        });

        return (<div className={classes}>
        <label htmlFor={name} className={styles.label}>
          <input type='checkbox' id={name} onClick={this.handleChange} onChange={this.handleNoop} value={value} name={name} {...extraProps}/>
          <span>{text}</span>
        </label>
      </div>);
    }

    handleNoop() {

    }
    handleChange(e) {
        let checked = this.props.checked;
        if (!this.props.readonly) {
            checked = !this.state.checked;
            this.setState({ checked });
        }

        if (this.props.onChange) {
            this.props.onChange(e, checked, this.props.value);
        } else if (this.props.onclick) {
            this.props.onclick(e, checked, this.props.value);
        }
    }
}

CheckBox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.string,
    readonly: PropTypes.bool
};

CheckBox.defaultProps = {
    disabled: false,
    checked: false
};