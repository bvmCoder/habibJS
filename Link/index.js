import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const elemProps = {};
        if (this.props.disabled) {
            elemProps.disabled = true;
        }
        if (this.props.href) {
            elemProps.href = this.props.href;
        }
        let classes = {};
        if (this.props.target) {
            elemProps.target = this.props.target;
        }
        switch (this.props.type) {
            case 'Gold':
                classes = cx(styles.linkGold, { disabled: this.props.disabled }, this.props.className);
                break;
            case 'Blue':
                classes = cx(styles.linkBlue, { disabled: this.props.disabled }, this.props.className);
                break;
            case 'Grey':
                classes = cx(styles.linkGrey, { disabled: this.props.disabled }, this.props.className);
                break;
            default:
                classes = cx(styles.linkBlue, { disabled: this.props.disabled }, this.props.className);
                break;
        }
        return (<a {...elemProps} onClick={this.props.onClick} className={classes} style={this.props.style}>
                {this.props.children}
            </a>);
    }
}

Link.propTypes = {
    href: React.PropTypes.string
};
