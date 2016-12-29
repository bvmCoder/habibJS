import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class ComboBoxPattern extends React.Component {
    render() {
        return (<PatternGroup name='ComboBox'>
        <Description>ComboBox with search</Description>
        <Pattern name='ComboBox'>
          <Description>Default ComboBox</Description>
          <CodeEditor codeText={CodeSamples.ComboBox}/>
        </Pattern>
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
        </Props>
      </PatternGroup>);
    }
}
