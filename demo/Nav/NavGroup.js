import * as React from 'react';
const style = require('./style.less');

export class NavGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
        <div className={style.group}>{this.props.name}</div>
        <ul className={style.groupItems}>
            {this.props.children}
        </ul>
      </div>);
    }
}
