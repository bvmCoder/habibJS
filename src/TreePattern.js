import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class TreePattern extends React.Component {
    render() {
        return (<PatternGroup name='Tree'>
        <Pattern name='Tree'>
            <Description>Tree component</Description>
            <CodeEditor codeText={CodeSamples.Tree}/>
        </Pattern>
         <Pattern name='Checkbox Tree'>
            <Description>Tree component with checkboxes</Description>
            <CodeEditor codeText={CodeSamples.TreeCheckbox}/>
        </Pattern>
        <Pattern name='CustomCheckbox Tree'>
            <Description>Checkbox Tree component with custom rendering and no root</Description>
            <CodeEditor codeText={CodeSamples.TreeCheckboxCustom}/>
        </Pattern>
        <Props name='Tree props'>
           <Prop name='className' type='string' default=''>
                Custom CSS class name to apply to element
           </Prop>
           <Prop name='title' type='string/object' default='' required>
               Title of the tree node. Optional for the root and if ommited for the root no root will be rendered.  
           </Prop>
            <Prop name='name' type='string' default=''>
               Name for the tree node  
           </Prop>
           <Prop name='id' type='string' default=''>
               User can assign an id to tree element.
           </Prop>
           <Prop name='checkbox' type='boolean' default='false'>
               To create a checkbox tree 
           </Prop>
           <Prop name='checked' type='boolean' default='false'>
               When true Checkbox appears as checked 
           </Prop>
           <Prop name='visible' type='boolean' default='true'>
               Tree node will be hidden if false 
           </Prop>
           <Prop name='expanded' type='boolean' default='false'>
               When true tree loads in all-expand mode
           </Prop>
            <Prop name='showAllCollapseExpand' type='boolean' default='false'>
               When true icon to collapse/expand all appears 
           </Prop>
            <Prop name='onCollpaseExpandClick' type='func' default=''>
                Callback when expand or collapse the node      
            </Prop>
            <Prop name='onNodeCheckboxClick' type='func' default=''>
                Callback when user check/uncheck checkbox      
            </Prop>
            <Prop name='inheritState' type='boolean' default='true'>
               When true children inherit checkbox select/deselect state of parent  
           </Prop>
        </Props>    
      </PatternGroup>);
    }
}
