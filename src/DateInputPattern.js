import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class DateInputPattern extends React.Component {
    render() {
        return (<PatternGroup name='DateInput'>
          <Pattern name='DateInput'>
              <Description>Use of DateInput</Description>
              {<CodeEditor codeText={CodeSamples.DateInput}/>}
          </Pattern>
          <Props name='DateInput props'>
              <Prop name='format' type='String' default='MM-DD-YYYY'>
                Format of date, which display in input and set in date property
              </Prop>
              <Prop name='date' type='String' default='Current date'>
                Set initial date value.
              </Prop>
              <Prop name='minDate' type='string' default='null'>
                Set the selectable minimum date.
              </Prop>
              <Prop name='maxDate' type='stromg' default='null'>
                Set the selectable maximum date.
              </Prop>
              <Prop name='onChange' type='func' default='null'>
                Set a function that will be triggered whenever there is a change in the selected date. 
              </Prop>
               <Prop name='onBlur' type='func' default='null'>
                Set a function that will be triggered when the input field is blurred.
              </Prop>
               <Prop name='disabled' type='boolean' default='fa;se'>
                If true, the input field gets disabled and the icon next to it disappears.
              </Prop>
            </Props>
      </PatternGroup>);
    }
}
