const optionItems = [
    { text: "item1", value: "1", key: "k1" },
    { text: "item2 - A very very very very very very very long one", value: "2", key: "k2" },
    { text: "item3", value: "3", selected: true, key: "k3" },
    { text: "item4", value: "4", selected: true, key: "k4" },
    { text: "item5", value: "5", key: "k5" }
];

const DropdownMultiselect = React.createClass({
    render() {
        return (
            <Dropdown multiselect controlled optionItems={optionItems} onChange={this.selectionChanged} width="200px" />
        );
    },
    selectionChanged(allItems) {
        const items = allItems.filter((item) => item.selected === true);
        console.log(`selected items = [${items.map((item) => item.key).join(",")}]`);
    }
});

ReactDOM.render(<DropdownMultiselect />, mountNode);
