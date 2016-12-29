import * as React from 'react';
import { Markdown } from './Markdown';
const mdContent = require('./MarkdownFiles');
export class Readme extends React.Component {
    render() {
        return (<Markdown source={mdContent.Readme}/>);
    }
}
