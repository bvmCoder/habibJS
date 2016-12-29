import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export default class ReactTablePattern extends React.Component {
    render() {
        return (<PatternGroup name='ReactTable'>
                <Description>React Table Examples</Description>
                <Pattern name='SimpleTable'>
                    <Description>Default Simple Table</Description>
                    <CodeEditor codeText={CodeSamples.ReactTable}/>
                </Pattern>
                <Pattern name='DragColumnTable'>
                    <Description>Drag Column Table</Description>
                    <CodeEditor codeText={CodeSamples.ReactDragTable}/>
                </Pattern>
                <Pattern name='Tree Table'>
                    <Description>First column is a tree view</Description>
                    <CodeEditor codeText={CodeSamples.TreeReactTable}/>
                </Pattern>
                <Pattern name='SortTable'>
                    <Description>Drag Column Table</Description>
                    <CodeEditor codeText={CodeSamples.ReactSortTable}/>
                </Pattern>
                <Props name='ReactTable props'>
                    <Prop name='className' type='string' default=''>
                        Custom CSS class name to apply to ReactTable
                    </Prop>
                    <Prop name='columns' type='array' default='' required>
                        Object describing the header props and 
                        data model that represents each object in the data
                    </Prop>
                    <Prop name='data' type='array' default='' required>
                        Array of objects representing each item to show.
                    </Prop>
                    <Prop name='enableColumnDraggable' type='boolean' default='true'>
                        If true, react table will display a dragbar to allow the user to drag the table row.
                    </Prop>
                    <Prop name='onExpand' type='string' default=''>
                        Callback function invoked when the row expand changes.
                    </Prop>
                    <Prop name='sortColumns' type='array' default=''>
                        Object describing the table sort columns
                    </Prop>
                </Props>
            </PatternGroup>);
    }
}
