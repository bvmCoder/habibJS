import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class PanelGroupPattern extends React.Component {
    render() {
        return (<PatternGroup name='PanelGroup'>
           <Description>Panle Group control</Description>
           <Pattern name='Panel Group'>
              <Description>Panel group control item </Description>
              <CodeEditor codeText={CodeSamples.PanelGroup} /> 
           </Pattern>
           <Props name='Panel Group props'>
                <Prop name='className' type='string' default=''>
                    Custom CSS class name to apply to element
                </Prop>
            </Props>
          </PatternGroup>);
    }
}
