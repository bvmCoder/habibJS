import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as CodeMirror from 'codemirror';
import * as Babel from 'babel-standalone';
import { Example } from './Example';
import { Canvas } from './Canvas';
const style = require('./style.less');
require('codemirror/mode/jsx/jsx');
require('./codemirror.css');

/* eslint-disable */
const fusionApi = require('../../../../fusionApi').default;
const Icon = require('../../../../../src/components/Icon').default;
const NavMenu = require('../../../../../src/components/NavMenu').default;
const Button = require('../../../../../src/components/Button').default;
const ButtonToolbar = require('../../../../../src/components/ButtonToolbar').default;
const Label = require('../../../../../src/components/Label').default;
const Grid = require('../../../../../src/components/Grid').default;
const Row = require('../../../../../src/components/Grid/Row').default;
const Column = require('../../../../../src/components/Grid/Column').default;
const Tabs = require('../../../../../src/components/Tabs').default;
const TabPanel = require('../../../../../src/components/Tabs/TabPanel').default;
const Link = require('../../../../../src/components/Link').default;
const Spinner = require('../../../../../src/components/Spinner').default;
const Radio = require('../../../../../src/components/Radio').default;
const RadioGroup = require('../../../../../src/components/RadioGroup').default;
const Dropdown = require('../../../../../src/components/Dropdown').default;
const DropdownList = require('../../../../../src/components/DropdownList').default;
const Pager = require('../../../../../src/components/Pager').default;
const Modal = require('../../../../../src/components/Modal').default;
const TextBox = require('../../../../../src/components/TextBox').default;
const CheckBox = require('../../../../../src/components/CheckBox').default;
const Table = require('../../../../../src/components/Table').default;
const superagent = require('superagent');
const TableColumn = require('../../../../../src/components/Table/TableColumn').default;
const DateInput = require('../../../../../src/components/DateInput').default;
const Accordion = require('../../../../../src/components/Accordion').default;
const Panel = require('../../../../../src/components/Panel').default;
const PanelGroup = require('../../../../../src/components/PanelGroup').default;
const Drawers = require('../../../../../src/components/Drawers').default;
const Popover = require('../../../../../src/components/Popover').default;
const Typeahead = require('../../../../../src/components/Typeahead').default;
const Tree = require('../../../../../src/components/Tree').default;
const TreeNode = require('../../../../../src/components/Tree/TreeNode').default;
const ToggleButton = require('../../../../../src/components/ToggleButton').default;
const MultiDropdown = require('../../../../../src/components/MultiDropdown').default;
const Content = require('../../../../../src/components/Popover/Content').default;
const PopoverTrigger = require('../../../../../src/components/Popover/Trigger').default;
const { ButtonGroup, ButtonGroupItem } = require('../../../../../src/components/ButtonGroup');
const LiteTable = require('../../../../../src/components/LiteTable').default;
const ReactTable = require('../../../../../src/components/ReactTable').default;
const DrillDown = require('../../../../../src/components/DrillDown').default;
const ComboBox = require('../../../../../src/components/ComboBox').default;
const AlertBanner = require('../../../../../src/components/AlertBanner').default;
const Tooltip = require('../../../../../src/components/Tooltip').default;
/* eslint-enable */

class CodeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.editor = null;
        this.ctrls = { editor: null };
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        // wrap in a div to fully contain CodeMirror
        /* eslint no-return-assign: 0, react/jsx-no-bind: 0*/
        let editorEl = <textarea ref={(editor) => this.ctrls.editor = editor} defaultValue={this.props.codeText}/>;
        return (<div className={style.code}>
        {editorEl}
      </div>);
    }
    componentDidMount() {
        if (CodeMirror === undefined) {
            return;
        }
        const config = {
            lineNumbers: true,
            lineWrapping: false,
            mode: 'jsx',
            readOnly: this.props.readonly === undefined ? false : this.props.readonly,
            tabSize: 2,
            theme: 'monokai'
        };
        this.editor = CodeMirror.fromTextArea(this.ctrls.editor, config);
        this.editor.setSize(null, '100%');
        this.editor.on('change', this.handleChange);
    }
    componentDidUpdate() {
        if (this.props.readonly) {
            this.editor.setValue(this.props.codeText);
        }
    }
    handleChange() {
        if (!this.props.readonly && this.props.onChange) {
            this.props.onChange(this.editor.getValue());
        }
    }
}
const SelfCleaningTimeoutMixin = {
    componentDidUpdate() {
        clearTimeout(this.timeoutId);
    },
    updateTimeout() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout.apply(null, arguments);
    }
};

export const CodeEditor = React.createClass({ /* eslint react/prefer-es6-class: 0 */
    mixins: [SelfCleaningTimeoutMixin],
    getInitialState() {
        return {
            code: this.props.codeText,
            codeChanged: false,
            showCode: true
        };
    },
    render() {
        return (<Example>
        <Canvas>
          {this.renderExample()}
        </Canvas>
        {this.renderEditor()}
      </Example>);
    },
    DOMRenderHook(element) {
        // console.log('hooked');
        this._initialExample = element;
    },
    componentWillMount() {
        // For the initial render, we can hijack React.render to intercept the
        // example element and render it normally. This is safe because it's code
        // that we supply, so we can ensure ahead of time that it won't throw an
        // exception while rendering.
        const originalRender = ReactDOM.render;
        ReactDOM.render = this.DOMRenderHook;
        // Stub out mountNode for the example code.
        const mountNode = null; /* eslint no-unused-vars: 0*/
        try {
            const compiledCode = this.transformer(this.props.codeText);
            // const compiler: Function = new Function(compiledCode);
            // compiler();      
            eval(compiledCode); /* eslint no-eval: 0 */
        } finally {
            ReactDOM.render = originalRender;
        }
    },
    componentWillUnmount() {
        this.clearExample();
    },
    handleCodeChange(value) {
        this.setState({ code: value, codeChanged: true, showCode: true }, this.executeCode);
    },
    renderExample() {
        let example;
        if (this.state.codeChanged) {
            example = (<div ref='mount'/>);
        } else {
            if (this._initialExample === undefined) {
                console.error('_initial example cannot be undefined');
            }
            example = (<div>{this._initialExample}</div>);
        }
        return (<div>
        {example}
      </div>);
    },
    renderEditor() {
        if (!this.state.showCode) {
            return null;
        }
        return (<CodeViewer key='jsx' onChange={this.handleCodeChange} codeText={this.state.code}/>);
    },
    clearExample() {
        if (!this.state.codeChanged) {
            return null;
        }
        const mountNode = this.refs.mount;
        try {
            ReactDOM.unmountComponentAtNode(mountNode);
        } catch (e) {
            console.error(e); // eslint-disable-line no-console
        }
        return mountNode;
    },
    executeCode() {
        const mountNode = this.clearExample();
        console.log('code executed: ' + mountNode);
        let compiledCode = null;
        try {
            compiledCode = this.transformer(this.state.code);
            //  const compiler: Function = new Function(compiledCode);
            //  compiler();      
            eval(compiledCode); /* eslint no-eval: 0 */
        } catch (err) {
            if (compiledCode !== null) {
                console.log(err, compiledCode); // eslint-disable-line no-console
            } else {
                console.log(err); // eslint-disable-line no-console
            }
            this.updateTimeout(() => {
                ReactDOM.render(<span>
              {err.toString()}
            </span>, mountNode);
            }, 500);
        }
    },
    transformer(code) {
        return Babel.transform(code, { plugins: ['transform-react-jsx'], presets: ['es2015'] }).code;
    }
});
// https://github.com/react-bootstrap/react-bootstrap/blob/master/docs/src/ReactPlayground.js
