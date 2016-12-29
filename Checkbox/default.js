const CheckBoxInstance = React.createClass({
    render: function render() {
        return (<div>
            <CheckBox text="Test1" value="check1" onChange={this.onChange} name="Test-1" />   
            <CheckBox text="Test2" value="check2" onChange={this.onChange} name="Test-2" checked />   
      </div>);
    },
    onChange: function onChange(e, checked, value) {
        console.log("checked=" + checked + ", value=" + value);
    }
});

ReactDOM.render(<CheckBoxInstance />, mountNode);