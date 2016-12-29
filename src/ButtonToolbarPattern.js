import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class ButtonToolbarPattern extends React.Component {
    render() {
        return (<PatternGroup name='ButtonToolbar'>
        <Description>Use any of the available button style types to quickly create a styled button</Description>
        <Pattern name='ButtonToolbar'>
            <Description>Basic button types</Description>
            <CodeEditor codeText={CodeSamples.ButtonToolbar}/>
        </Pattern>
      </PatternGroup>);
    }
}
