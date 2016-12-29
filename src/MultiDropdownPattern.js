import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class MultiDropdownPattern extends React.Component {
    render() {
        return (<PatternGroup name='DropdownType'>
                <Description>Use any of the available button style types to quickly create a styled button</Description>
                <Pattern name='DropdownType1'>
                    <Description />
                    <CodeEditor codeText={CodeSamples.MultiDropdown}/>
                </Pattern>
                <Props name='MultiDropdown props'>
                    <Prop name='className' type='string' default=''>
                        Set the top element to the class.
                    </Prop>
                    <Prop name='dropdownTitle' type='string' default='' required>
                        Title name of the dropdown.
                    </Prop>
                    <Prop name='dropdownType' type='number' default='1'>
                        When set to 1, the dropdown title will dismiss when dropdown list show.
                    </Prop>
                    <Prop name='optionsItems' type='array<Object>' default='' required>
                        Optional list.
                    </Prop>
                    <Prop name='uploadTheSelected' type='function' default='' required>
                        Callback invoked on any item click and return all selected items.
                    </Prop>
                    <Prop name='hideSearch' type='function' default=''>
                        When set true, the search block will be hidden.
                    </Prop>
                    <Prop name='hideTitle' type='function' default=''>
                        When set true, the title will be hidden.
                    </Prop>
                    <Prop name='selectedOptions' type='array<Object>' default=''>
                        Optional list for selected items
                    </Prop>
                </Props>
            </PatternGroup>);
    }
}
