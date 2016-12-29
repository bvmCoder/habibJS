import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class TextBoxPattern extends React.Component {
    render() {
        return (<PatternGroup name='TextBox'>
        <Pattern name='Simple TextBox'>
            <Description>Example of a basic TextBox rendering and event handling</Description>
            <CodeEditor codeText={CodeSamples.TextBox}/>
        </Pattern>
        <Pattern name='Multiline TextBox'>
            <Description>Multiline TextBox example using textarea</Description>
            <CodeEditor codeText={CodeSamples.MultilineTextBox}/>
        </Pattern>
        <Pattern name='Multiple text boxes'>
            <Description>Example of building a fluid form with text boxes in a grid</Description>
            <CodeEditor codeText={CodeSamples.TextBoxInForm}/>
        </Pattern>
        <Props name='TextBox props'>
          <Prop name='name' type='string' default=''>
             Set textbox element name
          </Prop>
          <Prop name='placeholder' type='string' default=''>
             Placeholder for the input
          </Prop>
          <Prop name='width' type='number' default='100%'>
             Set textbox width
          </Prop>
          <Prop name='value' type='string' default=''>
             Set textbox value
          </Prop>
          <Prop name='className' type='string' default=''>
             Set css class
          </Prop>
          <Prop name='disabled' type='boolean' default='false'>
            When set to true textbox will be disabled and will no longer accept any events
          </Prop>
          <Prop name='multiline' type='boolean' default='false'>
            When set to true textbox will render as a textarea
          </Prop>
          <Prop name='error' type='boolean' default=''>
            When set to true textbox will be displayed by the error style
          </Prop>
          <Prop name='onFocus' type='function' default=''>
            Callback that will be invoked when user focus on the textbox
          </Prop>
          <Prop name='onBlur' type='function' default=''>
            Callback that will be invoked when user onblur on the textbox
          </Prop>
          <Prop name='onChange' type='function' default=''>
            Callback that will be invoked when user change the text in the textbox
          </Prop>
        </Props>    
      </PatternGroup>);
    }
}
