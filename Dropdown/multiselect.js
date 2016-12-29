const optionItems = [
    { text: "item 1", key: "1" },
    { text: "item 2", key: "2" },
    { text: "item 3", key: "3", selected: true },
    { text: "item 4", key: "4", selected: true },
    { text: "item 5", key: "5" },
    { text: "item 6", key: "6" },
    { text: "item 7", key: "7" },
    { text: "item 8", key: "8" },
    { text: "item 9", key: "9" },
    { text: "item 10", key: "10" }
];

const DropdownMultiselect = React.createClass({ 
    render() {
        return (
            <Dropdown multiselect optionItems={optionItems} onChange={this.selectionChanged} width="200px" />
        );
    },
    selectionChanged(allItems) {
        const items = allItems.filter((item) => item.selected === true);
        console.log(`selected items = [${items.map((item) => item.key).join(",")}]`);
    }
});

ReactDOM.render(<DropdownMultiselect />, mountNode);
