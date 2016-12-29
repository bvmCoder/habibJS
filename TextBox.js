const TextBoxInstance = React.createClass({
    render() {
        return (<TextBox value="Hello" disabled={false} onChange={this.handleTextChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>);
    },
    handleTextChange() {
        console.log('the text in input has been changed');
    },
    handleFocus() {
        console.log('the  input is on focus');
    },
    handleBlur() {
        console.log('the  input is on blur');
    }
});
ReactDOM.render(<TextBoxInstance />, mountNode);
