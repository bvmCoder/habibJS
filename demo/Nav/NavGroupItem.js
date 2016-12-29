import * as React from 'react';
import { Link } from 'react-router';
const style = require('./style.less');

export class NavGroupItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let cl = style.groupItem;
        if (this.props.noop) {
            cl = [cl, style.groupItemNOOP].join(' ');
        }
        const link = this.props.noop === undefined
            ? <Link to={`/${this.context.page}/${this.props.name.replace(' ', '-')}`}>{this.props.name}</Link>
            : this.props.name;
        return (<li className={cl}>
        {link}
      </li>);
    }
}
NavGroupItem.contextTypes = {
    page: React.PropTypes.string
};
