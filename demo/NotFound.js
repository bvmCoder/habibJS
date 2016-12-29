import * as React from 'react';
import { Header } from './header/Header';
const baseStyle = require('./baseStyle.less');
export class NotFound extends React.Component {
    render() {
        return (<div>
        <Header activePage='NotFound'/>
        <div className={baseStyle.content}>
          <h1>Not Found</h1>
        </div>
      </div>);
    }
}
