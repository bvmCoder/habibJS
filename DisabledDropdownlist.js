const DisabledDropdownlist = React.createClass({
    render() {
        return (<Dropdownlist onChange={this.handleSelectItemChange} 
            disabled={true} optionItems={[
                { text: "the first option", value: "first" }, 
                { text: "the second option", value: "second" }]} 
                />   
        );
    },
    handleSelectItemChange(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        console.log(selectedOption.text);
        alert('selected item value is ' + selectedOption.text);
    }
});
ReactDOM.render(<DisabledDropdownlist />, mountNode);
