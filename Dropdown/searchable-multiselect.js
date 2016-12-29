const ComboBoxInstance = React.createClass({
    getInitialState: () => {
        return { showContent: false, searchText: "" };
    },
    _renderStates() {
        const searchText = this.state.searchText;
        let states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
            "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
        if (searchText) {
            states = states.filter((state) => {
                return state.toLowerCase().indexOf(searchText) >= 0;
            });
        }
        return states.map((state, index) => {
            return (<div key={index}> <CheckBox text={state}/> </div>);
        });
    },
    _renderContent() {
        const divContainer = { maxHeight: "250px", overflow: "auto", borderBottom: "1px solid #ccc" };
        const buttonSpan = { marginRight: "10px" };
        const buttonsDiv = { padding: "10px" };
        return (<div>
                <div style={divContainer}>
                    {this._renderStates()}
                </div>
                <div style={buttonsDiv}>
                    <span style={buttonSpan}><Button onClick={this.onCancelClick}>Cancel</Button></span>
                    <span><Button onClick={this.onOkClick} primary>OK</Button></span>
                </div>
            </div>);
    },
    onCancelClick() {
        this.setState({ showContent: false });
    },
    onOkClick() {
        this.setState({ showContent: false });
    },
    render() {
        return (<ComboBox onCollapseExpandClick={this.onCollapseExpandClick} showContent={this.state.showContent} searchText={this.state.searchText} onMouseLeave={this.onMouseLeave} onSearchTextChange={this.onSearchTextChange} placeholder="Search or Select State">
                {this._renderContent()}
            </ComboBox>);
    },
    onCollapseExpandClick() {
        this.setState({ showContent: !this.state.showContent });
    },
    onMouseLeave() {
        this.setState({ showContent: false });
    },
    onSearchTextChange(e) {
        this.setState({ showContent: true, searchText: e.currentTarget.value });
    }
});
ReactDOM.render(<ComboBoxInstance />, mountNode);
