import * as React from 'react';
import { Header } from './../header/Header';
import { DocsNav } from './DocsNav';
const baseStyle = require('../baseStyle.less');
export class Docs extends React.Component {
    render() {
        return (<div>
        <Header activePage='Docs'/>
        <DocsNav />
        <div className={baseStyle.navContent}>
          {this.props.children}
        </div>
      </div>);
    }
}
