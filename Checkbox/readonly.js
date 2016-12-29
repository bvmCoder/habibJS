const CheckBoxInstance = React.createClass({
    getInitialState: () => {
        return { chk1: false, chk2: true };
    },
    render: function render() {
        return (<div>
            <CheckBox text="Test1" value="check1" readonly onChange={this.onChange} name="Test-4" checked={this.state.chk1} />   
            <CheckBox text="Test2" value="check2" readonly onChange={this.onChange} name="Test-5" checked={this.state.chk2} />   
      </div>);
    },

    onChange: function onChange(e, checked, value) {
        if (value === 'check1') {
            this.setState({chk1: !this.state.chk1});
        }
        if (value === 'check2') {
            this.setState({chk2: !this.state.chk2});
        }
        
        console.log("checked=" + !checked + ", value=" + value);
    }
});

ReactDOM.render(<CheckBoxInstance />, mountNode);