import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class DropdownListPattern extends React.Component {
    render() {
        return (<PatternGroup name='DropdownList'>
        <Description>Basic dropdownList types</Description>
        <Pattern name='DropdownList'>
            <Description>Default DropdownList</Description>
            <CodeEditor codeText={CodeSamples.DropdownList}/>
        </Pattern>
        <Props name='DropdownList props'>
          <Prop name='optionItems' type='array<optionItem>' default='' required>
            Array of DropdownList options source
          </Prop>
          <Prop name='onChange' type='function' default=''>
            Callback that will be invoked when user change the dropdownlist option item
          </Prop>
          <Prop name='width' type='number' default='100%'>
            Set DropdownList Container width ex. 240px or 50%
          </Prop>
        </Props>
        <Props name='OptionItem properties'>
          <Prop name='text' type='string' default='' required>
            Dropdownlist option item text
          </Prop>
          <Prop name='value' type='string' default='' required>
            Dropdownlist option item value
          </Prop>
          <Prop name='selected' type='bool' default=''>
            Dropdownlist option item default, if not the first option will be the default 
          </Prop>
        </Props>     
      </PatternGroup>);
    }
}
