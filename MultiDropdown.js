const items = [
    { text: "item1", value: "1" },
    { text: "item2", value: "2" },
    { text: "item3", value: "3" },
    { text: "item4", value: "4" },
    { text: "item5", value: "5" }
];
const selectedItems = ["item1", "item2", "item3", "item4", "item5"];
const dropdownTitle = "inustry";

const MultiDropdownInstance = React.createClass({
    render() {
        return (<MultiDropdown includeButtons selectedOptions={selectedItems} removeUnchecked hideSearch hideTitle mouseLeave={this.mouseLeave.bind(this)} optionsItems={items} dropdownTitle={dropdownTitle} dropdownType={0} uploadTheSelected={this.uploadTheSelected.bind(this)}/>);
    },
    uploadTheSelected() {
        return;
    },
    mouseLeave(selectedOptions) {
        console.log(selectedOptions);
    }
});

ReactDOM.render(<MultiDropdownInstance />, mountNode);
