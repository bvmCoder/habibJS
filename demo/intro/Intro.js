import * as React from 'react';
import { Header } from './../header/Header';
import { ComponentsNav } from '../components/ComponentsNav';
import { Link } from 'react-router';
const baseStyle = require('../baseStyle.less');
const style = require('./style.less');
export class Intro extends React.Component {
    render() {
        return (<div>
        <Header activePage='Intro'/>
         <ComponentsNav />
         <div className={baseStyle.navContent}>
          <div className={style.intro}>
            <div className={style.heading}>
              <h1>Neptune</h1>
              <p>A user interface framework of reusable front-end components</p>
            </div>
            <div className={style.content}>
              <p>Neptune will drive many of the decisions Platform Technology Solutions will make around front-end architecture and day-to-day development.</p>
              <h2>About Neptune</h2>
              <ul>
                <li>Cross-Platform - Written in Javascript</li>
                <li>Uses React framework</li>
                <li>Reusable components and styles</li>
                <li>Compatible across browsers</li>
                <li>Information needed to install, configure and create your application </li>
              </ul>
              <h2>Benefits</h2>
              <ul>
                <li>Consistency</li>
                <li>Efficient & cost saving</li>
                <li>Quick to market / agile</li>
                <li>Shared vocabulary</li>
                <li>Future friendly</li>
                <li>Easier to test</li>
              </ul>
              <h2>Resources</h2>
              <ul>
                <li><Link to='/docs/readme'>Documentation & Guidelines</Link></li>
              </ul>
              <h2>Install</h2>
              <ul>
                <li className={style.console}>
                  <a href='http://apc-lgmdcdvw202:8081/package/mdc-neptune' target='blank'>npm install mdc-neptune</a>
              </li>
              </ul>
            </div>              
          </div>
        </div>      
      </div>);
    }
}
