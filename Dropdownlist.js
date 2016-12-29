const items1 = [
    { text: "A", value: 1 },
    { text: "B", value: 2 },
    { text: "C", value: 3 }
];
const items2 = [
    { text: "the first option", value: 1 },
    { text: "the second option", value: 2 },
    { text: "the third option", value: 3, selected: true }
];
const DropdownListInstance = React.createClass({
    render() {
        return (<div>
            <DropdownList optionItems={items1} width="50%" onChange={this.handleSelectItemChange}/>   
            <DropdownList optionItems={items1} width="250px" onChange={this.handleSelectItemChange}/>   
            <DropdownList optionItems={items2} onChange={this.handleSelectItemChange}/>   
        </div>);
    },
    handleSelectItemChange(val, options) {
        const selectedOption = options.filter((opt) => opt.value === val)[0];
        const logText = `selected item value is: {text: "${selectedOption.text}", value: ${val}}`;
        console.log(logText);
        // alert(logText);
    } });
ReactDOM.render(<DropdownListInstance />, mountNode);
