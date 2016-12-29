import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class LabelPattern extends React.Component {
    render() {
        return (<PatternGroup name='Label'>
        <Description>Basic Form controls</Description>
        <Pattern name='Label'>
            <Description>Basic label types</Description>
            <CodeEditor codeText={CodeSamples.DefaultLabel}/>
        </Pattern>
        <Props name='Label props'>
          <Prop name='className' type='string' default=''>
            Custom CSS class name(s) to apply to element
          </Prop>
          <Prop name='type' type='string' default=''>
            you can use type from <a target='_blank' href='http://uxdev.moodys.com/prototypes/uxFramework/#g=1&p=typography'>HERE</a>
          </Prop>
          <Prop name='color' type='string' default=''>
            only suport color from <a target='_blank' href='http://uxdev.moodys.com/prototypes/uxFramework/#g=1&p=color'>HERE</a>. Porperties name rule: spaces replace "-",remove "'". so you can use color porperties like color = "MA-BLUE" or color = "MOODYS-BLUE"
          </Prop>
          <Prop name='block' type='boolean' default='false'>
            label show in one line
          </Prop>
          <Prop name='html' type='string' default=''>
            label show html strings
          </Prop>
          <Prop name='maxLength' type='number' default=''>
            truncate label text,while maxLength is 12,label show first 12 characters and "..."
          </Prop>
          <Prop name='for' type='string' default=''>
            Id of form element the label is explicitly associated with
          </Prop>
          <Prop name='disabled' type='boolean' default='false'>
            Disable label
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
