import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class ButtonsPattern extends React.Component {
    render() {
        return (<PatternGroup name='Button'>
        <Description>Use any of the available button style types to quickly create a styled button</Description>
        <Pattern name='Types'>
            <Description>Basic button types</Description>
            <CodeEditor codeText={CodeSamples.DefaultButton}/>
        </Pattern>
        <Pattern name='Handling State'>
            <Description>Handling onClick event and active/disabled state</Description>
            <CodeEditor codeText={CodeSamples.StateButton}/>
        </Pattern>
        <Pattern name='Disabled Button'>
            <Description>Use of Disabled button</Description>
            <CodeEditor codeText={CodeSamples.DisabledButton}/>
        </Pattern>
        <Props name='Button props'>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
          <Prop name='disabled' type='boolean' default='false'>
            When set to true button will be disabled and will no longer accept onClick events
          </Prop>
          <Prop name='onClick' type='function' default='' required>
            Callback that will be invoked when user clicks on the button...
          </Prop>
          <Prop name='primary' type='boolean' default='false'>
            Usually used in modals and forms. Primary button is the button that will be activated when user presses Enter/Return key
          </Prop>
          <Prop name='size' type='array' default='medium'>
            Button size. One of: ['small', 'medium', 'large']
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
