import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class NavMenuPattern extends React.Component {
    render() {
        return (<PatternGroup name='Navigation Menu'>
        <Description>Use any of the available navmenu style types to quickly create a styled navmenu</Description>
        <Pattern name='Types'>
            <Description>navmenu types</Description>
            <CodeEditor codeText={CodeSamples.DefaultNavMenu}/>
        </Pattern>
        <Props name='NavMenu props'>
          <Prop name='menuItems' type='any<menuItem>' default='[]' required>
             Navigation Menu data source, it is array type
          </Prop>
          <Prop name='topBold' type='boolean' default='false'>
            while true,the navigation Menu container top border is 3px,otherwise top border is 1px
          </Prop>
        </Props>
        <Props name='NavMenu menuItem props'>
          <Prop name='label' type='string' default='' required>
             Navigation Menu item label
          </Prop>
          <Prop name='url' type='string' default='' required>
            Navigation Menu item url
          </Prop>
          <Prop name='active' type='boolean' default='false'>
            when navigation menu item active is true, it will be selected.
          </Prop>
          <Prop name='disabled' type='function' default='false'>
            when navigationmenu item is disabled,it can not be clicked.
          </Prop>
          <Prop name='pjax' type='boolean' default='false'>
            when pjax is true, while click navigation menu item, the browser will not reload itself.
          </Prop>
          <Prop name='target' type='string' default='_self'>
            The target attribute specifies where to open the linked document,the same to html A tag target attribute.
          </Prop>
          <Prop name='onClick' type='string' default=''>
            Event handler initializing item
          </Prop>
          <Prop name='children' type='any' default='[]'>
              array of navigation menu sub items.
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
