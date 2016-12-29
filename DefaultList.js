/* eslint no-use-before-define: 0*/
const someItemsFromAPI = [
    { id: 1, text: "Text 1" },
    { id: 2, text: "Text 2" },
    { id: 3, text: "Text 3" },
    { id: 4, text: "Text 4" },
    { id: 5, text: "Text 5" },
    { id: 6, text: "Text 6" },
    { id: 7, text: "Text 7" },
    { id: 8, text: "Text 8" }
];
const ListInstance = React.createClass({
    getInitialState: () => {
        return {
            filter: '',
            multiselect: false,
            filtered: false,
            items: someItemsFromAPI,
            results: []
        };
    },
    toggleMultiselect() {
        this.setState({ multiselect: !this.state.multiselect });
    },
    toggleFiltered() {
        this.setState({ filtered: !this.state.filtered, filter: "" });
    },
    handleFilterChange(event) {
        this.setState({ filter: event.target.value });
    },
    onChange(selection) {
        if (selection) {
            if (!(selection instanceof Array)) {
                selection = [selection];
            }
            this.setState({ results: selection });
        } else {
            this.setState({ results: [] });
        }
    },
    onItemSelected(item) {
        alert('Item [' + item.text + '] was selected');
    },
    onItemDeselected(item) {
        alert('Item [' + item.text + '] was unselected');
    },
    selectAll() {
        this.refs.sampleList.selectAll();
    },
    unselectAll() {
        this.refs.sampleList.clearSelection();
    },
    render() {
        let ftext = this.state.filtered
            ? <input type="text" onChange={this.handleFilterChange} value={this.state.filter} placeholder='Enter filter text'/>
            : "";
        return (<div>
        <div style={panelStyle}>
          <List items={this.state.items} filterText={this.state.filter} multiselect={this.state.multiselect} 
              onChange={this.onChange} onItemSelected={this.onItemSelected} 
              onItemDeselected={this.onItemDeselected} ref="sampleList"
          />
        </div>
        <div style={resultsStyle}>
          <span>Selected Items</span>
          <div style={resultsListStyle}>
            <ul style={ulStyle}>
              {this.state.results.map((item, indx) => {
                  return <li key={indx}>{item.text}</li>;
              })}
            </ul>
          </div>
          <input type="checkbox" name="cbm" value={this.state.multiselect} onChange={this.toggleMultiselect}/>
          <span>Multi Select</span>
          <br />
          <button type='button' style={buttonlStyle} onClick={this.selectAll}>Select All</button>
          <button type='button' style={buttonlStyle} onClick={this.unselectAll}>Unsel. All</button>
          <br />
          <input type="checkbox" name="cbf" value={this.state.filtered} onChange={this.toggleFiltered}/>
          <span>Filtered</span>
          {ftext}
        </div>
      </div>);
    }
});
const panelStyle = {
    background: '#fff',
    padding: '10px',
    border: '2px solid #f0f0f0',
    width: '170px',
    height: '120px',
    margin: '15px',
    position: 'relative'
};
const resultsStyle = {
    background: '#fff',
    padding: '10px 10px 45px 10px',
    border: '1px solid #f0f0f0',
    width: '170px',
    height: '120px',
    margin: '-165px 15px 5px 350px',
    position: 'relative'
};
const resultsListStyle = {
    background: '#eee',
    height: '50px',
    padding: '0',
    margin: '0',
    overflowY: 'auto'
};
const buttonlStyle = {
    margin: '5px'
};
const ulStyle = {
    margin: '2px 0 2px 0'
};
ReactDOM.render(<ListInstance />, mountNode);
