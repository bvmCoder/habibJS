import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class TabsPattern extends React.Component {
    render() {
        return (<PatternGroup name='Tabs'>
          <Pattern name='Tabs'>
              <Description>Use of Tabs</Description>
              {<CodeEditor codeText={CodeSamples.Tabs}/>}
          </Pattern>
            <Props name='Tabs props'>
              <Prop name='className' type='string' default=''>
                Custom CSS class name to apply to element
              </Prop>
              <Prop name='onAfterChange' type='func' default=''>
                Event handler after selected tab changed
              </Prop>
              <Prop name='onBeforeChange' type='func' default=''>
                Event handler before selected tab changed
              </Prop>
              <Prop name='onMount' type='func' default=''>
                Event handler initializing tabs
              </Prop>
              <Prop name='tabActive' type='number' default=''>
                Set active tab in the tabs
              </Prop>
            </Props>
            <Props name='TabPanel props'>
              <Prop name='className' type='string' default=''>
                Custom CSS class name to apply to element
              </Prop>
              <Prop name='title' type='string' default=''>
                Set tab title
              </Prop>
            </Props>
      </PatternGroup>);
    }
}
