import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class LinksPattern extends React.Component {
    render() {
        return (<PatternGroup name='Link'>
        <Description>Use any of the available Link types to quickly create a different link</Description>
        <Pattern name='Default'>
            <Description>Default Link</Description>
            <CodeEditor codeText={CodeSamples.DefaultLink}/>
        </Pattern>
        <Pattern name='Gold'>
            <Description>Default Link</Description>
            <CodeEditor codeText={CodeSamples.GoldLink}/>
        </Pattern>
        <Pattern name='Grey'>
            <Description>Default Link</Description>
            <CodeEditor codeText={CodeSamples.GreyLink}/>
        </Pattern>
        <Props name='Link props'>
          <Prop name='type' type='string' default='Blue'>
            Specifies the link type with differrent styles.
          </Prop>
          <Prop name='disabled' type='boolean' default='false'>
            When set to true link will be disabled and will no longer accept onClick events
          </Prop>
          <Prop name='href' type='string' default='' required>
            Specifies the URL of the page the link goes to
          </Prop>
          <Prop name='target' type='string' default='_blank'>
            The target attribute specifies where to open the linked document.
          </Prop>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
          <Prop name='onClick' type='function' default=''>
            Callback that will be invoked when user clicks on the link
          </Prop>
        </Props>      
      </PatternGroup>);
    }
}
