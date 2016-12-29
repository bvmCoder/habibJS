const DefaultPopover = React.createClass({
    handleTriggered() {
        console.log("triggered");
    },
    handleClosed() {
        console.log("closed");
    },
    render() {
        return (<div style={{ margin: 'auto' }}>
                <Popover trigger="click" align='right' onTriggered={this.handleTriggered} onClosed={this.handleClosed} toolTips>
                    <PopoverTrigger>Default</PopoverTrigger>
                    <Content>
                        <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                            Lorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolorLorem ipsum dolor
                        </div>
                    </Content>
                </Popover>
            </div>);
    }
});
ReactDOM.render(<DefaultPopover />, mountNode);
