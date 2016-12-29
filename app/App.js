import * as React from 'react';
const style = require('./style.less');
export class App extends React.Component {
    render() {
        return (<div className={style.global}>
        {this.props.children}
      </div>);
    }
}
