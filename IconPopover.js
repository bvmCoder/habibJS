const DefaultPopover = React.createClass({
    render() {
        return (<Popover trigger="click" align='right'>
                <PopoverTrigger><Icon icon="bell"/></PopoverTrigger>
                <Content>
                    <div style={{ position: "relative", width: "263px", height: "100px", border: "1px solid" }}>
                        <div>
                            <button>NONE</button>
                            <button>REAL TIME</button>
                            <button>DAILY</button>
                            <button>WEEKLY</button>
                        </div>
                        <button style={{ position: "absolute", bottom: "0px", right: "0px" }}>Apply</button>
                    </div>
                </Content>
            </Popover>);
    }
});
ReactDOM.render(<DefaultPopover />, mountNode);
