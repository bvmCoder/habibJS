import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isActive: false, textVal: this.props.value };
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
    }
    render() {
        const elemProps = { onBlur: this.onInputBlur, onChange: this.onInputChange, onFocus: this.onInputFocus, placeholder: this.props.placeholder || '', type: 'text', value: this.state.textVal };
        if (this.props.disabled) {
            elemProps.disabled = true;
        }
        const classes = cx({
            active: this.state.isActive && !this.props.error,
            default: !this.state.isActive && !this.props.error,
            defaultHeight: !this.props.height,
            error: this.props.error
        });
        elemProps.className = setCssModule(classes, this.props.className);
        const blockStyle = {};
        if (this.props.width) {
            blockStyle.width = this.props.width;
        }
        if (this.props.height) {
            blockStyle.height = this.props.height;
        }
        if (this.props.multiline) {
            return (<div>
                    <textarea {...elemProps} ref='refInput' style={blockStyle}/>
                </div>);
        }
        return (<div>
                <input {...elemProps} ref='refInput' style={blockStyle}/>
            </div>);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value || this.state.textVal !== nextProps.value) {
            this.setState({ isActive: this.state.isActive, textVal: nextProps.value });
        }
    }
    onInputFocus(e) {
        this.setState({ isActive: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }
    onInputBlur(e) {
        this.setState({ isActive: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }
    onInputChange(e) {
        this.setState({ textVal: e.currentTarget.value });
        if (this.props.onChange) {
            this.props.onChange(e, e.currentTarget.value);
        }
    }
}
TextBox.propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    height: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    multiline: React.PropTypes.bool,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    width: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
};
