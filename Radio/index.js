import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class Radio extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const elemProps = {};
        if (this.props.disabled) {
            elemProps.disabled = true;
        }
        if (this.props.name) {
            elemProps.name = this.props.name;
        }
        if (this.props.checked) {
            elemProps.defaultChecked = true;
        }
        const classes = cx(this.props.className, {
            disabled: this.props.disabled,
            radio: true,
            radioText: true
        });
        return (<div>
                <input type='radio' className={classes} {...elemProps} onChange={this.props.onChange}/>
                <span className={styles.content}>{this.props.children}</span>
            </div>);
    }
}
