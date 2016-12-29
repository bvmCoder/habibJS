const AccordionInstance = React.createClass({
    render() {
        return (<Accordion activePanel={0} onItemExpandCollapse={this.onItemExpandCollapseClick}>
                <Panel title="Regions" onExpandCollapseClick={this.onRegionsExpandCollapseClick}>
                 <CheckBox text="Test1" value="0" name="Test-1"/>
                 <CheckBox text="Test2" value="1" name="Test-2"/>
                </Panel>
                <Panel title="Sectors">
                  <CheckBox text="Test1" value="0" name="Test-1"/>
                  <CheckBox text="Test2" value="1" name="Test-2"/>
                </Panel>
                <Panel title="Ratings">
                  <CheckBox text="Test1" value="0" name="Test-1"/>
                  <CheckBox text="Test2" value="1" name="Test-2"/>
                </Panel>
            </Accordion>);
    },
    onItemExpandCollapseClick(panel) {
        console.log(panel.props.title);
    },
    onRegionsExpandCollapseClick(panel) {
        console.log(panel.props.title);
    }
});
ReactDOM.render(<AccordionInstance />, mountNode);
