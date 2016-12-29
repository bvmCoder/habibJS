import * as React from 'react';
const style = require('./style.less');
export class Props extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className={style.props} id='Props'>
        <span className={style.propsTitle}>{this.props.name}</span>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Default Value</th>
              <th>Type</th>
              <th>Required</th>
             </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>);
    }
}
