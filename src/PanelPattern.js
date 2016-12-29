import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class PanelPattern extends React.Component {
    render() {
        return (<PatternGroup name='Panel'>
           <Description>Panel control</Description>
            <Pattern name='Panel'>
              <Description>Panel control can be used as a simple container with title and content.  It can also be used inside an Accordion component.</Description>
              <CodeEditor codeText={CodeSamples.Panel} /> 
           </Pattern>
           <Props name='Panel Props'>
                <Prop name='className' type='string' default=''>
                    Custom CSS class name to apply to element
                </Prop>
                 <Prop name='title' type='string/object' default='' required>
                    Title for the panel container.
                </Prop>
                <Prop name='subTitle' type='string/object' default=''>
                    Subtitle for the panel container.
                </Prop>
                <Prop name='expanded' type='boolean' default='true'>
                    Panel content visible if set to true
                </Prop>
                <Prop name='collapsible' type='boolean' default='false'>
                    User can collapse/expand content if set to true
                </Prop>
                <Prop name='onExpandCollapseClick' type='func' default=''>
                    Callback when user clicks on expand or collapse icon  
                </Prop>
            </Props>
          </PatternGroup>);
    }
}
