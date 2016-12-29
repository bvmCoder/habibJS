import * as React from 'react';
import { Link, IndexLink } from 'react-router';
const style = require('./style.less');
const Links = {
    /*
    'download': {
      link: '/download',
      title: 'Download',
    }, */
    'components': {
        link: '/components',
        title: 'Components'
    },
    'docs': {
        link: '/docs',
        title: 'Docs'
    }
};

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const links = Object.keys(Links).map((linkName) => {
            const link = Links[linkName];
            return (<div key={linkName} className={this.props.activePage === link.title ? style.activeLink : style.link}>
            <Link to={link.link}>{link.title}</Link>
          </div>);
        });
        return (<div className={style.header}>
        <div key={'brand'} className={style.appName}>
          <IndexLink to='/'>Neptune framework</IndexLink>
        </div>
        {links}
      </div>);
    }
}
