import * as React from 'react';
const style = require('./style.less');
export class Prop extends React.Component {
    constructor(prop) {
        super(prop);
    }
    render() {
        return (<tr>
        <td>{this.props.name}</td>
        <td>{this.props.children}</td>
        <td>{this.props.default}</td>
        <td>
          <div className={style.propsType}>{this.props.type}</div>
        </td>
        <td>
          <div className={this.props.required ? style.propsRequired : style.propsOptional}>
            {this.props.required ? 'Required' : 'Optional'}
          </div>
        </td>
      </tr>);
    }
}
Prop.defaultProps = {
    required: false
};
