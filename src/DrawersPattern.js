import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class DrawersPattern extends React.Component {
    render() {
        return (<PatternGroup name='Drawers'>
        <Description>Basic Drawers types</Description>
        <Pattern name='Drawers'>
            <Description>Default Drawers</Description>
            <CodeEditor codeText={CodeSamples.Drawers}/>
        </Pattern>
        <Props name='Drawers props'>
          <Prop name='className' type='node' default=' ' required>
            custom class
          </Prop>
          <Prop name='width' type='number' default='350'>
             content width
          </Prop>
          <Prop name='children' type='any' default=' ' required>
            Children Content
          </Prop>
          <Prop name='onRequestClose' type='function' default=' '>
            Request Close Event
          </Prop>
          <Prop name='title' type='string' default='' required>
             title
          </Prop>
        </Props> 
      </PatternGroup>);
    }
}
