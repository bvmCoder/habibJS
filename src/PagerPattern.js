import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class PagerPattern extends React.Component {
    render() {
        return (<PatternGroup name='Pager'>
        <Description>Basic Pager types</Description>
        <Pattern name='Pager'>
            <Description>Default Pager</Description>
            <CodeEditor codeText={CodeSamples.Pager}/>
        </Pattern>
        <Props name='Pager props'>
          <Prop name='currentIndex' type='number' default='0'>
            Current Page Index
          </Prop>
          <Prop name='totalCount' type='number' default='' required>
             set dropdownlist select name.
          </Prop>
          <Prop name='pageSize' type='number' default='50'>
            Page Size
          </Prop>
          <Prop name='maxButtonCount' type='number' default='7'>
            Max Number Page Button Count
          </Prop>
          <Prop name='onPageSelect' type='function' default=''>
            Callback that will be invoked when user click this page number item
          </Prop>
          <Prop name='labels' type='array' default='null'>
            Display Content
          </Prop>
          <Prop name='todos' type='any' default='null'>
            Extend space
          </Prop>
        </Props> 
      </PatternGroup>);
    }
}
