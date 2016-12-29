import * as React from 'react';
const style = require('./style.less');
export class Pattern extends React.Component {
    render() {
        return (<div className={style.pattern} id={this.props.tag === undefined ? this.props.name.replace(' ', '_') : this.props.tag}>
        <span className={style.patternName}>{this.props.name}</span>
        {this.props.children}
      </div>);
    }
}
