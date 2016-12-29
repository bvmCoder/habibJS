import * as React from 'react';
const style = require('./style.less');
export class Canvas extends React.Component {
    render() {
        return (<div className={style.canvas}>
        <div className={style.label}>EXAMPLES</div>
        {this.props.children}
      </div>);
    }
}
