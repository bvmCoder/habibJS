const TypeaheadInstance = React.createClass({
    render() {
        return (
            <Typeahead options={["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
                "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]} placeholder="Search state" onSelected={this.onSearchResultSelected} pageSize={20}
            />);
    },
    onSearchResultSelected(result) {
        alert("You have selected " + result);
    }
});

ReactDOM.render(<TypeaheadInstance />, mountNode);
