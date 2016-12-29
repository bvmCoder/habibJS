import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class ButtonGroupPattern extends React.Component {
    render() {
        return (<PatternGroup name='ButtonGroup'>
        <Description>A Button Group Component</Description>
        <Pattern name='Basic usage'>
            <Description>{`ButtonGroup Component must have some ButtonGroupItem children.
               Since it's display is 'inline-block', it is suggested to warp it into a 
               div or a row.`}</Description>
            <CodeEditor codeText={CodeSamples.DefaultButtonGroup}/>
        </Pattern>
        <Pattern name='More API'>
            <Description>We provide some callback functions for you.</Description>
            <CodeEditor codeText={CodeSamples.ButtonGroupAPI}/>
        </Pattern>
        <Props name='ButtonGroup props'>
          <Prop name='type' type='string' default='small'>
            one of ['small', 'big']
          </Prop>
          <Prop name='onChange' type='function' default=''>
            {`(thisIndex, nextIndex) => { /* your code */ }`}
          </Prop>
          <Prop name='style' type='object' default=''>
            Custom styles if need.
          </Prop>
          <Prop name='selectedIndex' type='Number' default=''>
            Use to set the selected button manually.
          </Prop>
          <Prop name='defaultIndex' type='Number' default='0'>
            Use to set the default selected button.
          </Prop>
        </Props>
        <Props name='ButtonGroupItem props'>
          <Prop name='onClick' type='function' default=''>
            {`(event, ThisReactElement) => { /* your code */ }`}
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
