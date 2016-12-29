import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { CodeEditor } from './components/CodeEditor';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
const CodeSamples = require('./components/CodeSamples');
export class IconPattern extends React.Component {
    render() {
        return (<PatternGroup name='Icon'>
        <Description>Use any of the available iconname to quickly create a Icon component</Description>
        <Pattern name='Icon'>
            <Description>Icon component</Description>
            <CodeEditor codeText={CodeSamples.Icon}/>
        </Pattern>
        <Props name='Icon props'>
          <Prop name='name' type='string' default='' required>
            icon name in uxFramwork Icon List <a target="_blank" href="http://uxdev.moodys.com/prototypes/uxFramework/#g=1&p=icons">Here</a>
          </Prop>
          <Prop name='color' type='string' default=''>
            set color of Icon
          </Prop>
          <Prop name='zoom' type='string' default='1'>
            set zoom of Icon
          </Prop>
        </Props>
      </PatternGroup>);
    }
}
