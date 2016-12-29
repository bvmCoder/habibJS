import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');

export class DropdownPattern extends React.Component {
    render() {
        return (<PatternGroup name='Dropdown'>
        <Description>Dropdown component with multiselect, controlled and searchable options</Description>
        <Pattern name='Default'>
            <Description>Default Dropdown</Description>
            <CodeEditor codeText={CodeSamples.Dropdown.Default}/>
        </Pattern>
         <Pattern name='Multiselect'>
            <Description>Multiselect Dropdown</Description>
            <CodeEditor codeText={CodeSamples.Dropdown.Multiselect}/>
        </Pattern>
        <Pattern name='Multiselect with controls'>
            <Description>Multiselect Dropdown with controls</Description>
            <CodeEditor codeText={CodeSamples.Dropdown.MultiselectControlled}/>
        </Pattern>
        
        {/*
        <Pattern name='Searchable'>
            <Description>Searchable Dropdown</Description>
            <CodeEditor codeText={CodeSamples.Dropdown.Searchable}/>
        </Pattern>
        <Pattern name='Searchable multiselect'>
            <Description>Searchable Multiselect Dropdown</Description>
            <CodeEditor codeText={CodeSamples.Dropdown.SearchableMultiselect}/>
        </Pattern>*/}
        <Props name='Dropdown props'>
          <Prop name='optionItems' type='array<optionItem>' default='' required>
            Array of DropdownList options source
          </Prop>
          <Prop name='onChange' type='function' default=''>
            Callback that will be invoked when user change the dropdownlist option item
          </Prop>
          <Prop name='search' type='bool' default='' required>
            Set this property if Dropdown can be searchable via Typeahead
          </Prop>
          <Prop name='multiselect' type='bool' default='' required>
            Dropdown items display as checkboxes
          </Prop>
          <Prop name='controlled' type='bool' default='true' required>
            To dismiss the control user needs to click on Ok / Cancel buttons
          </Prop>
          <Prop name='width' type='number' default='100%'>
            Set DropdownList Container width ex. 240px or 50%
          </Prop>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
        </Props>
        <Props name='OptionItem object properties'>
          <Prop name='key' type='string' required>
            Required unique key for the item
          </Prop>
          <Prop name='text' type='string' required>
            Dropdownlist option item text
          </Prop>
          <Prop name='value' type='string'>
            Dropdownlist option item value
          </Prop>
          <Prop name='selected' type='bool' default='false'>
            Dropdownlist option item default, if not the first option will be the default 
          </Prop>
        </Props>
        {/*     
        <Props name='ComboBox properties'>
          <Prop name='className' type='string' default=''>
            ComboBox css class name
          </Prop>
          <Prop name='placeholder' type='string' default=''>
            placeholder for the ComboBox
          </Prop>
          <Prop name='searchText' type='string' default=''>
            Value of the search text box
          </Prop>
          <Prop name='showContent' type='bool' default='false'>
            To make content visible or hidden
          </Prop>
          <Prop name='onSearchTextChange' type='func' default=''>
            Callback when user start typing in search box
          </Prop>
          <Prop name='onCollapseExpandClick' type='func' default=''>
            Callback when click on ComboBox arrow
          </Prop>
          <Prop name='onMouseLeave' type='func' default=''>
            Callback when mouse moves 
          </Prop>
          <Prop name='disableSearch' type='bool' default='false'>
            To disable search box
          </Prop>
        </Props>*/}        
      </PatternGroup>);
    }
}
