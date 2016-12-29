import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class DrillDownPattern extends React.Component {
    render() {
        return (
            <PatternGroup name='DrillDown'>
                <Description>Unfinished...</Description>
                <Pattern name='Basic usage'>
                    <Description>The DrillDown is used to show deep data logic, you don't need to query
                    all the data at first time, you decide what to insert then user click the drill.</Description>
                    <CodeEditor codeText={CodeSamples.BasicDrillDown}/>
                </Pattern>
                <Pattern name='AVG style'>
                    <Description>average style drilldown.</Description>
                    <CodeEditor codeText={CodeSamples.AVGDrillDown}/>
                </Pattern>
            </PatternGroup>
      );
    }
}
