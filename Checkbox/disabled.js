const DisabledCheckBoxInstance = React.createClass({
    render() {
        return (<CheckBox text="Check Box 2" value="1" onChange={this.onChange} name="Test-3" disabled />);
    },
    onChange: function onChange() {
        console.log("this should NOT be called");
    }    
});

ReactDOM.render(<DisabledCheckBoxInstance />, mountNode);
