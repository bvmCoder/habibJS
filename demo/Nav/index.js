import * as React from 'react';
const style = require('./style.less');
export class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return { page: this.props.page };
    }
    render() {
        return (<div className={style.nav}>
        {this.props.children}
      </div>);
    }
}
Nav.childContextTypes = {
    page: React.PropTypes.string
};
