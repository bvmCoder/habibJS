import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class GridPattern extends React.Component {
    render() {
        return (<PatternGroup name='Grid'>
        <Description>Flexible grid system to organize your components in the page. 
        To create a layout, you must have one &lt;Grid/&gt; component. Inside you can use &lt;Row/&gt; and &lt;Column/&gt; components. 
        You may also use custom components (which could include furthur &lt;Row/&gt; and &lt;Column/&gt; components.</Description>
        <Pattern name='Grid'>
            <Description>Basic grid layout</Description>
            {<CodeEditor codeText={CodeSamples.BasicGrid}/>}
        </Pattern>
        <Props name='Grid props'>
          <Prop name='columnWidth' type='number' default='60'>
            Maximum width of the column in pixels
          </Prop>
          <Prop name='gutterWidth' type='number' default='20'>
            Gutter width in pixels i.e. margin between column
          </Prop>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
        </Props>
        <Props name='Row props'>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
        </Props>
        <Props name='Column props'>
          <Prop name='width' type='string' default='1/1'>
            Column width in fractions. Example '1/2' or '1/12' or '3/12 
          </Prop>
          <Prop name='offset' type='string' default=''>
            Offset in fractions. Example '1/2' or '1/12' or '3/12
          </Prop>
          <Prop name='className' type='string' default=''>
            Custom CSS class name to apply to element
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
