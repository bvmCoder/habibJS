import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class PopoverPattern extends React.Component {
    render() {
        return (<PatternGroup name='Popover'>
        <Description>Basic Popover controls, show overlay when trigger event happens on the child element.</Description>
        <Pattern name='Popover Default'>
          <Description>Default Popover</Description>
          <CodeEditor codeText={CodeSamples.DefaultPopover}/>
        </Pattern>
        <Pattern name='Popover with text'>
          <Description>Popover with text </Description>
          <CodeEditor codeText={CodeSamples.TextPopover}/>
        </Pattern>
        <Pattern name='Popover with icon'>
          <Description>Popover with icon </Description>
          <CodeEditor codeText={CodeSamples.IconPopover}/>
        </Pattern>
        <Pattern name='Popover with Tooltips'>
          <Description>Popover with Tooltips </Description>
          <CodeEditor codeText={CodeSamples.TooltipsPopover}/>
        </Pattern>
        <Props name='Popover props'>
          <Prop name='children' type='node' default='' required>
            The target element.Could be React element.original, Only one element allowed.Now you can give two when not toolTips, refer to 'Popover with text'.
          </Prop>
          <Prop name='trigger' type='string' default='' required>
            The event name.Could be 'click' or 'hover' or 'focus' or combination of them.
          </Prop>
          <Prop name='overlay' type='node' default='' required>
            The element to display when trigger event happens.
          </Prop>
          <Prop name='align' type='string' default='bottom-right'>
            overlay align.
          </Prop>
          <Prop name='toolTips' type='boolean' default='true'>
            if toolTips.
          </Prop>
          <Prop name='additionalContentClassName' type='string' default=''>
            add addtional content 'class' name when you need to override content css
          </Prop>
          <Prop name='disable' type='boolean' default='false'>
            if disable is true, trigger event will not happen.
          </Prop>
          <Prop name='onTriggered' type='function' default='undefined'>
            it will be call after the click action be triggered.
          </Prop>
          <Prop name='onClosed' type='function' default='undefined'>
            it will be call after the the overlay close.
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
