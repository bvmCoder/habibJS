const TypeaheadInstance = React.createClass({
    render() {
        return (
            <Typeahead placeholder="Search state" onSelected={this.onSearchResultSelected} 
                pageSize={20} onSearch={this.onSearchTrigger} onRender={this.onRenderResults}
            />);
    },
    onSearchResultSelected(result) {
        return result.Name;
    },
    onSearchTrigger(searchText, pager, searchCompletedCallback) {
        fusionApi.getOrganizationsSvc(searchText, pager.pageNumber - 1, pager.pageSize).then((res) => {
            searchCompletedCallback(res);
        });
    },
    onRenderResults(result) {
        return result.Name;
    }
});

ReactDOM.render(<TypeaheadInstance />, mountNode);
