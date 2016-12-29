const TextPopover = React.createClass({
    render() {
        return (<Popover trigger="click" align='bottom-right'>
                <PopoverTrigger><Link>Email Setting</Link></PopoverTrigger>
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
ReactDOM.render(<TextPopover />, mountNode);
