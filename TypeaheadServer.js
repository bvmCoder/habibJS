const TypeaheadInstance = React.createClass({
    render() {
        return (
            <Typeahead delay={1000} placeholder="Search state" 
                onSelected={this.onSearchResultSelected} pageSize={20} 
                multiSelect onSearch={this.onSearchTrigger}
            />);
    },
    onSearchResultSelected(result) {
        alert("You have selected " + result);
    },
    onSearchTrigger(searchText, pager, searchCompletedCallback) {
        fusionApi.getOrganizationsSvc(searchText, pager.pageNumber - 1, pager.pageSize).then((res) => {
            searchCompletedCallback(res.map((org) => { 
                return org.Name; 
            }));
        });
    }
});

ReactDOM.render(<TypeaheadInstance />, mountNode);
