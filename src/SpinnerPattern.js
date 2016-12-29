import * as React from 'react';
import { PatternGroup } from './components/PatternGroup';
import { Pattern } from './components/Pattern';
import { Description } from './components/Description';
import { Props } from './components/Props';
import { Prop } from './components/Prop';
import { CodeEditor } from './components/CodeEditor';
const CodeSamples = require('./components/CodeSamples');
export class SpinnerPattern extends React.Component {
    render() {
        return (<PatternGroup name='Spinner'>
        <Description>Spinner is used for loading, reloading, and more, to provide use a better experience.</Description>
        <Pattern name='Spinner'>
            <Description>This component use canvas to draw a gradient circle, and CSS3 animation to animate it.</Description>
            <CodeEditor codeText={CodeSamples.Spinner}/>
        </Pattern>
        <Props name='Spinner props'>
          <Prop name='size' type='number' default='60'>
            Can be any number, but keep between 50 and 150 sounds good.
          </Prop>
          <Prop name='color' type='string' default='rgb(205,156,84)'>
            Attention ! color can only be 'rgb()' string, this is because component will change it to 'rgba()' when drawing canvas.
          </Prop>
          <Prop name='speed' type='number' default='2'>
            How many seconds will the spinner spin a full cycle. Smaller is faster.
          </Prop>
          <Prop name='lineWidth' type='number' default='2'>
            How many pixels is the circle line width, default is 2.
          </Prop>
          <Prop name='fontStyle' type='Object' default='{}'>
            {`Custom inline style of the text font, just add {fontWeight: '300', fontStyle: 'italic'}`}
          </Prop>
          <Prop name='style' type='Object' default='{}'>
            add inline style of the whole component, will help if you want to do vertical align middle.
          </Prop>
        </Props>      
      </PatternGroup>);
    }
}
