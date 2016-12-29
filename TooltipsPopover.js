const TooltipsPopover = React.createClass({
    render() {
        const blockStyle = { width: '20%', height: '100px', display: 'inline-block' };
        return (<div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='top-right'>
                        <PopoverTrigger>Default (top-right) </PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='top-left'>
                        <PopoverTrigger>top-left</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='left'>
                        <PopoverTrigger>left</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='right'>
                        <PopoverTrigger>right</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='bottom-left'>
                        <PopoverTrigger>bottom-left</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='bottom-right'>
                        <PopoverTrigger>bottom-right</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='right-top'>
                        <PopoverTrigger>right-top</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='left-top'>
                        <PopoverTrigger>left-top</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='left-bottom'>
                        <PopoverTrigger>left-bottom</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </div>
                        </Content>
                    </Popover>
                </div>
                <div style={blockStyle}>
                    <Popover trigger='hover' toolTips align='right-bottom'>
                        <PopoverTrigger>right-bottom</PopoverTrigger>
                        <Content>
                            <div style={{ position: "relative", fontSize: "14px", fontWeight: "bold" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </div>
                        </Content>
                    </Popover>
                </div>

            </div>);
    }
});
ReactDOM.render(<TooltipsPopover />, mountNode);
