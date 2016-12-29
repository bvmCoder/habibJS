const MultilineTextBox = React.createClass({
    render() {
        return (<TextBox placeholder="enter multiline text here" multiline height={200} width={200} />);
    }
});

ReactDOM.render(<MultilineTextBox />, mountNode);
