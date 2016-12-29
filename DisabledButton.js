const DisabledButton = React.createClass({
    render() {
        return (<ButtonToolbar>
        <Button onClick={this.handleClick}>Click Me</Button>
        <Button disabled onClick={this.handleClick}>Can't click me</Button>
      </ButtonToolbar>);
    },
    handleClick() {
        alert('clicked');
    }
});
ReactDOM.render(<DisabledButton />, mountNode);
