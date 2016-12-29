const PanelGroupInstance = React.createClass({
    render() {
        return (<PanelGroup>
                <Panel title="Human Resources">
                    Human resources content goes here
                </Panel>
                <Panel title="IT Services">
                   IT services content goes here
                </Panel>
                <Panel title="Sales Department">
                   Sales Department content goes here
                </Panel>
            </PanelGroup>);
    }
});
ReactDOM.render(<PanelGroupInstance />, mountNode);
