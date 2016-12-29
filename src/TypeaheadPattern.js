import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class TypeaheadPattern extends React.Component {
    render() {
        return (<PatternGroup name='Typeahead'>
           <Description>Typeahead control</Description>
           <Pattern name='Static Typeahead'>
              <Description>Typeahead searches item using static source provided with configuration of Typeahead control</Description>
              <CodeEditor codeText={CodeSamples.Typeahead} />  
           </Pattern>
           <Pattern name='Server Typeahead'>
              <Description>Typehead searches item from the server and provides results back to the control</Description>
              <CodeEditor codeText={CodeSamples.TypeaheadServer} />
           </Pattern>
            <Pattern name='Custom Typeahead'>
              <Description>User have capability to render result as needed with paging on scroll.</Description>
              <CodeEditor codeText={CodeSamples.TypeaheadCustomRender} /> 
           </Pattern>
           <Props name='Typeahead props'>
                <Prop name='charCount' type='number' default='1'>
                    Minimum number of characters required to trigger the search
                </Prop>
                 <Prop name='className' type='string' default=''>
                    Custom CSS class name to apply to element
                </Prop>
                 <Prop name='delay' type='number' default='250'>
                    Delay before search triggers (in milliseconds) and to disable the timer/delay set it to 0 
                </Prop>
                <Prop name='listHeight' type='number' default='250'>
                    Height of the result list (in px) 
                </Prop>
                <Prop name='multiSelect' type='boolean' default='false'>
                    When true results will display with checkboxes to select multiple results 
                </Prop>
                <Prop name='multiSelectButtonText' type='string' default=''>
                    Button text for multi select ok button 
                </Prop>
                <Prop name='onRender' type='func' default=''>
                    Callback where user can provide how the result would render     
                </Prop>
                 <Prop name='onSearch' type='func' default=''>
                    Callback when user needs to search on server.      
                </Prop>
                 <Prop name='onSelected' type='func' default=''>
                    Callback when user select item(s) from the suggested list and a string can be return to appear in the input     
                </Prop>
                 <Prop name='options' type='string' default=''>
                    Array of string to search from,  for example 'Banking, Finance, Human Resources'  
                </Prop>
                 <Prop name='pageSize' type='number' default='0'>
                    Page size for paging
                </Prop>
                 <Prop name='placeholder' type='string' default='Search'>
                    Placeholder for search input 
                </Prop>
            </Props>
          </PatternGroup>);
    }
}
