import * as React from 'react';
import { Nav } from '../components/Nav';
import { NavGroup } from '../components/Nav/NavGroup';
import { NavGroupItem } from '../components/Nav/NavGroupItem';
export class DocsNav extends React.Component {
    render() {
        return (<Nav page='docs'>
        <NavGroup name='Docs'>
            <NavGroupItem name='Readme'/>
            <NavGroupItem name='Guidelines'/>
        </NavGroup>
      </Nav>);
    }
}
