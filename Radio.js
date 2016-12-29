const RadioInstance = React.createClass({
    render() {
        return (<RadioGroup>
            <Radio onChange={this.handleClick}>Check Me</Radio>
            <Radio disabled onChange={this.handleClick}>Can't check me</Radio>
        </RadioGroup>);
    },
    handleClick() {
        alert('checked!');
    }
});
ReactDOM.render(<RadioInstance />, mountNode);
