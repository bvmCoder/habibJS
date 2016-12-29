const itemsA = [
    { key: "itemA1", text: "A", value: 1 },
    { key: "itemA2", text: "B - A very very very very very very very very very long option", value: 2 },
    { key: "itemA3", text: "C", value: 3 }
];
const itemsB = [
    { key: "itemB1", text: "the first option" },
    { key: "itemB2", text: "the second option - A very very very very very very very very very long option" },
    { key: "itemB3", text: "the third option", selected: true},
    { key: "itemB4", text: "the fourth option" },
    { key: "itemB5", text: "the fifth option" },
    { key: "itemB6", text: "the sixth option" }
];
const DropdownListInstance = React.createClass({
    render() {
        return (<Grid>
            <Row>
                <div style={{marginBottom: '20px'}}>
                    <Dropdown optionItems={itemsA} width="50%" onChange={this.handleSelectItemChange}/>  
                </div> 
            </Row>
            <Row>
                <div style={{marginBottom: '20px'}}>
                    <Dropdown optionItems={itemsA} width="250px" onChange={this.handleSelectItemChange}/> 
                </div>  
            </Row>
            <Row>
                <Dropdown optionItems={itemsB} onChange={this.handleSelectItemChange}/>   
            </Row>
        </Grid>);
    },
    handleSelectItemChange(key, options) {
        const selectedOption = options.filter((opt) => opt.key === key)[0];
        const logText = `selected item is: key: ${key}, text: ${selectedOption.text}, value: ${selectedOption.value}`;
        console.log(logText);
    } });
ReactDOM.render(<DropdownListInstance />, mountNode);
