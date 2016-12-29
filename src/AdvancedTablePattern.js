import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class AdvancedTablePattern extends React.Component {
    render() {
        return (<PatternGroup name='Table'>
                <Description>Table Examples</Description>
                <Pattern name='AdvancedTable'>
                    <Description>Default Advanced Table</Description>
                    <CodeEditor codeText={CodeSamples.AdvancedTable}/>
                </Pattern>
                <Props name='Table props'>
                    <Prop name='columns' type='array' default=''>
                        The array of child columns for this table.Each column is a type of TableColumn class
                    </Prop>
                    <Prop name='enablePaging' type='boolean' default='true'>
                        Flag to show or hide the paging control
                    </Prop>
                    <Prop name='pageLength' type='number' default='20'>
                        Size of the current page
                    </Prop>
                    <Prop name='enableSearch' type='boolean' default='true'>
                        Flag to show or hide the search control
                    </Prop>
                    <Prop name='enableComponentUpdates' type='boolean' default='false'>
                        Flag to enable component updates - defaults to false, so as to not cause any backwards compatibility issues. 
                        If set to true, the component will respond to props changes. Since DataTableWrapper wraps a jQuery component, we simply ignore any prop changes.
                    </Prop>
                    <Prop name='enableShowTotalCount' type='boolean' default='true'>
                        Flag to show or hide the total count of the table records
                    </Prop>
                    <Prop name='enableOrdering' type='boolean' default='true'>
                        Flag to enable or disable ordering for table
                    </Prop>
                    <Prop name='enableSearch' type='boolean' default='false'>
                        Flag to show or hide the search control
                    </Prop>
                    <Prop name='enableVerticalScroll' type='boolean' default='falsetrue'>
                         Flag to enable or disable the vertical scrolling behavior. When this is set to false, the table will grow
                         until it renders all the data specified in the data array. If it is set to true, the table will
                         have a fixed height and will render a scrollbar if the data exceeds that specified height.
                    </Prop>
                    <Prop name='enableHorizontalScroll' type='boolean' default='false'>
                        Flag to enable or disable the horizontal scrolling behavior. When this is set to false, the table will fit  
                        all columns in the visible area. If it is set to true, the table will
                        have a scrollbar that renders columns at their specified width.
                    </Prop>
                    <Prop name='enableDeferRender' type='boolean' default='true'>
                        Render only the visible cells
                    </Prop>
                    <Prop name='enableScroll' type='boolean' default='false'>
                        Shortcut to set both enableVerticalScroll and enableHorizontalScroll
                    </Prop>
                    <Prop name='enableColumnSettings' type='boolean' default='false'>
                        Flag to enable or disable the settings btn [UX tbd] - This allows the user to choose columns to show. 
                    </Prop>
                    <Prop name='enableFixedHeader' type='boolean' default='false'>
                        Flag to enable or disable the fixed header functionality. Setting this to true will make the headers stick
                        to the top when the user scrolls.
                    </Prop>
                    <Prop name='enableFixedGroupingRow' type='boolean' default='false'>
                        Flag to enable or disable the fixed grouping row functionality. 
                        Setting this to true will make the group rows stick to the top when the user scrolls.
                    </Prop>
                    <Prop name='removeFirstGroupRow' type='boolean' default='false'>
                        Remove first group row header, replace it with float header
                    </Prop>
                    <Prop name='fixedHeaderOffset' type='number' default='20'>
                        How far below the top of the window to render the fixed header. Defaults to zero, but you can change it if you have anything else fixed above this.
                        For example, in CV2, we have the global sitewide fixed header on above the table header.
                    </Prop>
                    <Prop name='isLoading' type='boolean' default='false'>
                        If true the table will displays a progress bar or a spinner icon
                    </Prop>
                    <Prop name='enableShowTotalCount' type='boolean' default='true'>
                        Flag to show or hide the label "Showing X to Y of Z entries"
                    </Prop>
                    <Prop name='enableOrdering' type='boolean' default='true'>
                        Flag to enable or disable ordering for table
                    </Prop>
                    <Prop name='defaultSortField' type='string, array[string]' default=''>
                        The name of a field in the data by which you want the data to be sorted by default. 
                    </Prop>
                    <Prop name='rowGroupingField' type='string' default=''>
                        The name of a field in the data by which you want to group the rows. The grouped rows will show the data in a cell above the rest. 
                    </Prop>                    
                    <Prop name='onColumnSortCallback' type='func' default=''>
                        Callback when user sort table by column  
                    </Prop>
                    <Prop name='leftLockedCount' type='number' default='0'>
                        Number of columns to lock on the left.
                    </Prop>                    
                    <Prop name='rightLockedCount' type='number' default='0'>
                        Number of columns to lock on the right.
                    </Prop>     
                    <Prop name='height' type='number' default='300'>
                        Height of the table component, in pixels, defaults to 300
                    </Prop>   
                    <Prop name='rowCreatedCallback' type='func' default=''>
                        Call back function that takes the generated row, row data, and the index.   
                        Use this callback to perform any custom logic on the cells after it is created.
                        Signature : (tr: any, data: any, index: any) => void;
                    </Prop>   
                    <Prop name='headerCreatedCallback' type='func' default=''>
                        Call back function that takes the generated row, row data, and the index.   
                        Use this callback to perform any custom logic on the cells after it is created.
                    </Prop>   
                    <Prop name='headerCreatedCallback' type='func' default=''>
                        Call back function that is called on every 'draw' event
                        (i.e. when a filter, sort or page event is initiated by the end user or the API),
                        and allows you to dynamically modify the header row.
                        This can be used to calculate and display useful information about the table.   
                        Signature : (thead: any, data: any, start: any, end: any, edisplaynd: any) => void
                    </Prop>   
                    <Prop name='cellClickCallback' type='func' default=''> 
                        Call back function that takes the generated cell, row data, and the index. \
                        Use this callback to perform custom logic on click of any cell.   
                        Signature : (td: any, data: any, row: any, col: any) => void
                    </Prop>   
                </Props>
            </PatternGroup>);
    }
}
