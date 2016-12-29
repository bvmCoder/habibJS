import * as React from 'react';
const style = require('./style.less');
export class Example extends React.Component {
    render() {
        return (<div className={style.examples}>
        {this.props.children}
      </div>);
    }
}
