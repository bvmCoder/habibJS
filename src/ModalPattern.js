import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class ModalPattern extends React.Component {
    render() {
        return (<PatternGroup name='Modal'>
        <Description>Basic Overlay controls</Description>
        <Pattern name='Modal'>
            <Description>Basic modal types</Description>
            <CodeEditor codeText={CodeSamples.Modal}/>
        </Pattern>
        <Props name='Modal props'>
          <Prop name='children' type='node' default=''>
            The contents of the Modal. Could be string, React element or an array of React element.
          </Prop>
          <Prop name='footer' type='node' default=''>
            Buttons to display below the content (children). Could be string, React element or an array of React element.
          </Prop>
          <Prop name='onRequestClose' type='function' default='' required>
            Fired when the Modal is requested to be close.
          </Prop>
          <Prop name='maskClosable' type='boolean' default='true'>
            If true, clicking outside the modal or press 'ESC' key will trigger the onRequestClose.
          </Prop>
          <Prop name='showCloseButton' type='boolean' default='true'>
            If true, show close button in top right corner.
          </Prop>
          <Prop name='title' type='node' default=''>
            The title to display. Could be string, React element or an array of React element.
          </Prop> 
          <Prop name='visible' type='bool' default='' required>
            Current visible status.
          </Prop>
          <Prop name='width' type='number' default=''>
            Set the width of Modal.
          </Prop>           
          <Prop name='customizedTitle' type='bool' default='false'>
            if you want to customize your own title ,set it!
          </Prop>           
        </Props>
      </PatternGroup>);
    }
}
