import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class AlertBannerPattern extends React.Component {
    render() {
        return (<PatternGroup name='AlertBanner'>
        <Description>AlertBanner is used to provide an alert message to the user</Description>
        <Pattern name='Basic AlertBanner'>
            <Description>
              This is a basic AlertBanner component which automatically opens up on page load and auto-closes in 10 seconds, refresh the page to re-load the AlertBanner.
            </Description>
            <CodeEditor codeText={CodeSamples.AlertBanner}/>
        </Pattern>
        <Pattern name='Advanced AlertBanner'>
            <Description>
              This is an Advanced AlertBanner component, click on the link below to open the Banner. <br/>
              Alter the properties and check the effect by clicking on the link again.<br/>
              The Alert can be closed by clicking on the close (x) icon, it will autoclose in 10 seconds.<br/>              
            </Description>
            <CodeEditor codeText={CodeSamples.AdvancedAlertBanner}/>
        </Pattern> 
        <Pattern name='Modal AlertBanner'>
            <Description>
              This example shows how to use the AlertBanner in a Modal Dialog. <br/>
              Set the inline property to use the AlertBanner in a Modal Dialog, this way the AlertBanner takes the relative position of the Model Dialog instead of the Browser window top position.
            </Description>
            <CodeEditor codeText={CodeSamples.ModalAlertBanner}/>
        </Pattern>                
        <Props name='AlertBanner props'>
          <Prop name='autoclose' type='boolean' default='true' >
            Auto closes the Banner in 10 seconds, set this to false to prevent auto-close.
          </Prop>
          <Prop name='closeable' type='boolean' default='true'>
            Provides a close (x) icon to manually close the Banner, set this to false to prevent manual close.
          </Prop>
          <Prop name='onClose' type='function' default=' '>
            Callback that will be invoked when user click on the close (x) icon (or) when auto-close is triggered on the AlertBanner.
          </Prop>          
          <Prop name='children' type='any' default='' required>
             Content of the AlertBanner, can include text, icons and Link controls.
          </Prop>
        </Props> 
      </PatternGroup>);
    }
}
