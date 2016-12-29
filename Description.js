import * as React from 'react';
const style = require('./style.less');
export class Description extends React.Component {
    render() {
        return (<p className={style.description}>
        {this.props.children}
      </p>);
    }
}
