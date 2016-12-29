import * as React from 'react';
const Remarkable = require('remarkable');
export class Markdown extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const Container = this.props.container;
        return (<Container>
        {this.content()}
      </Container>);
    }
    componentWillUpdate(nextProps) {
        if (nextProps.options !== this.props.options) {
            this.md = new Remarkable(nextProps.options);
        }
    }
    content() {
        if (this.props.source) {
            return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(this.props.source) }}/>;
        } else {
            return React.Children.map(this.props.children, (child) => {
                if (typeof child === 'string') {
                    return <span dangerouslySetInnerHTML={{ __html: this.renderMarkdown(child) }}/>;
                } else {
                    return child;
                }
            });
        }
    }
    renderMarkdown(source) {
        if (!this.md) {
            this.md = new Remarkable(this.props.options);
        }
        const parsed = this.md.render(source);
        return parsed;
    }
}
Markdown.defaultProps = {
    container: 'div',
    options: {
        breaks: false,
        html: false,
        langPrefix: 'language-',
        linkTarget: '',
        linkify: true,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
        quotes: '“”‘’',
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        xhtmlOut: false
    }
};
