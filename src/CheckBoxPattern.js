import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');

export class CheckBoxPattern extends React.Component {
    render() {
        return (<PatternGroup name='CheckBox'>
        <Description>Basic CheckBox types</Description>
        <Pattern name='Default'>
            <Description>Default Checkbox</Description>
            <CodeEditor codeText={CodeSamples.CheckBox.Default}/>
        </Pattern>
        <Pattern name='Disabled'>
            <Description>Disabled CheckBox</Description>
            <CodeEditor codeText={CodeSamples.CheckBox.Disabled}/>
        </Pattern>
        <Pattern name='Readonly'>
            <Description>Readonly CheckBox</Description>
            <CodeEditor codeText={CodeSamples.CheckBox.Readonly}/>
        </Pattern>
        <Props name='CheckBox props'>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
          <Prop name='disabled' type='boolean' default='false'>
            When set to true CheckBox will be disabled and will no longer accept onClick events
          </Prop>
          <Prop name='name' type='string' default=''>
             set CheckBox select name.
          </Prop>
          <Prop name='onChange' type='function' default=''>
            Callback that will be invoked when user click the CheckBox
          </Prop>
          <Prop name='text' type='string' default=''>
            CheckBox text
          </Prop>
          <Prop name='value' type='string' default=''>
           CheckBox value
          </Prop>
          <Prop name='checked' type='boolean' default='false'>
           set CheckBox default checked.
          </Prop>
        </Props>     
      </PatternGroup>);
    }
}
