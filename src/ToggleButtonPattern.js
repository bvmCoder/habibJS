import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class ToggleButtonPattern extends React.Component {
    render() {
        return (<PatternGroup name='ToggleButton'>
          <Pattern name='ToggleButton'>
              <Description>Use of ToggleButton</Description>
              {<CodeEditor codeText={CodeSamples.ToggleButton}/>}
          </Pattern>
          <Props name='ToggleButton props'>
               <Prop name='disabled' type='boolean' default='false'>
                  If true, disabled property gets passed down to child elements
              </Prop>
               <Prop name='selected' type='number' default='' required>
                  Zero-based index of selected child
              </Prop>
          </Props>
      </PatternGroup>);
    }
}
