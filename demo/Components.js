import * as React from 'react';
import { ComponentsNav } from './ComponentsNav';
import { Header } from './../header/Header';
const baseStyle = require('../baseStyle.less');
export class Components extends React.Component {
    render() {
        return (< div>
        <Header activePage='Components'/>
        <ComponentsNav />
         <div className={baseStyle.navContent}>
          {this.props.children}
        </div>
      </div>);
    }
}
