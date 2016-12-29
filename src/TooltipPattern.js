import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class TooltipPattern extends React.Component {
    render() {
        return (<PatternGroup name='Tooltip'>
        <Description>Basic Tooltip controls, show overlay when trigger event happens on the child element.</Description>
        <Pattern name='Tooltips Default'>
          <Description>Default Tooltip</Description>
          <CodeEditor codeText={CodeSamples.DefaultTooltip}/>
        </Pattern>
        <Props name='Tooltips props'>
          <Prop name='tooltipTrigger' type='any' default='' required>
            The element that can trigger tooltip when mouse hove the type could be any
          </Prop>
          <Prop name='tooltipText' type='string' default='' required>
           Tooltiptext to show when it be triggered
          </Prop>
          <Prop name='align' type='string' default='top-right' required>
           The align prop should be one of['top-right', 'top-left', 'right', 'left', 'bottom-right', 'bottom-left', 'right-top', 'left-top', 'right-bottom', 'left-bottom']
          </Prop>
        </Props>
      </PatternGroup>);
    }
}