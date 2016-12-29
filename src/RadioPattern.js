import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class RadioPattern extends React.Component {
    render() {
        return (<PatternGroup name='RadioButton'>
        <Description>Basic radio types</Description>
        <Pattern name='Radio'>
            <Description>Default Radio</Description>
            <CodeEditor codeText={CodeSamples.Radio}/>
        </Pattern>
        <Pattern name='RadioGroup'>
            <Description>Radio Group</Description>
            <CodeEditor codeText={CodeSamples.RadioGroup}/>
        </Pattern>
        <Props name='Radio props'>
          <Prop name='disabled' type='boolean' default='false'>
            When set to true radio will be disabled and will no longer accept onClick events
          </Prop>
          <Prop name='name' type='string' default=''>
            When set to the same name in different Radios, only one check.
          </Prop>
          <Prop name='onClick' type='function' default=''>
            Callback that will be invoked when user clicks on the radio
          </Prop>
        </Props>      
      </PatternGroup>);
    }
}
