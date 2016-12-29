const PanelInstance = React.createClass({
    getInitialState: () => {
        return { expanded: true };
    },
    render() {
        return (<Panel title="TITLE" subTitle="Sub Title" expanded={this.state.expanded} onExpandCollapseClick={this.onExpandCollapseClick} collapsible>
                    Content for the panel, which may be plain text or combinations of other components with text etc goes here. 
                    Content for the panel, which may be plain text or combinations of other components with text etc goes here.
                    Content for the panel, which may be plain text or combinations of other components with text etc goes here.
                    Content for the panel, which may be plain text or combinations of other components with text etc goes here.           
               </Panel>);
    },
    onExpandCollapseClick(panel) {
        console.log(panel);
        this.setState({ expanded: !this.state.expanded });
    }
});
ReactDOM.render(<PanelInstance />, mountNode);
