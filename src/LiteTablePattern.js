import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class LiteTablePattern extends React.Component {
    render() {
        return (<PatternGroup name='Table'>
                <Description>Table Examples</Description>
                <Pattern name='LiteTable'>
                    <Description>Lite Table</Description>
                    <CodeEditor codeText={CodeSamples.LiteTableSample}/>
                </Pattern>  
                <Pattern name='LiteTableTreeView'>
                    <Description>Lite Table with Tree View</Description>
                    <CodeEditor codeText={CodeSamples.LiteTableTreeViewSample}/>
                </Pattern>                                 
                <Props name='Table props'>
                    <Prop name='options' type='object' default=''>
                        Please refer to datatables.net/reference/option/
                    </Prop>
                </Props>
            </PatternGroup>);
    }
}
