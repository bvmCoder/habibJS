import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');

export class AccordionPattern extends React.Component {
    render() {
        return (<PatternGroup name='Accordion'>
           <Description>Accordion control</Description>
           <Pattern name='Accordion Panel'>
              <Description>Accordion control item </Description>
              <CodeEditor codeText={CodeSamples.Accordion} />  
           </Pattern>
           <Props name='Accordion props'>
                <Prop name='className' type='string' default=''>
                    Custom CSS class name to apply to element
                </Prop>
                <Prop name='activePanel' type='number' default='-1'>
                    Index of the panel to be expanded (start with 0)
                </Prop>
                 <Prop name='multiExpand' type='boolean' default='false'>
                    When true user can expand multiple tabs
                </Prop>
                 <Prop name='onItemExpandCollapse' type='func' default=''>
                    Callback when user expande/collapse accordion item  
                </Prop>
            </Props>
          </PatternGroup>);
    }
}
