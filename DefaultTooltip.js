const TooltipInstance = React.createClass({

    render() {
        const DefaultTrigger = <Label block for="someId">Default(top-right)</Label>;
        const tlTrigger = <Label block for="someId">top-left</Label>;
        const lTrigger = <Label block for="someId">left</Label>;
        const rTrigger = <Label block for="someId">right</Label>;
        const blTrigger = <Label block for="someId">bottom-left</Label>;
        const brTrigger = <Label block for="someId">bottom-right</Label>;
        const rtTrigger = <Label block for="someId">right-top</Label>;
        const ltTrigger = <Label block for="someId">left-top</Label>;        
        const lbTrigger = <Label block for="someId">left-bottom</Label>;
        const rbTrigger = <Label block for="someId">right-bottom</Label>;        
        const blockStyle = { width: '20%', height: '100px', display: 'inline-block' };
        const minwidthTooltiptext = "Lorem";
        const maxwidthTooltiptext = "Consequuuntur magni dolores eos qui ratione volupatem sequiaccusantiom doereldsal .";
        
        return (  
    <div>
    <div style={blockStyle}>
    <Tooltip tooltipTrigger={DefaultTrigger} tooltipText={minwidthTooltiptext} align="top-right"/>
    </div>
    <div style={blockStyle}>
    <Tooltip tooltipTrigger={tlTrigger} tooltipText={minwidthTooltiptext} align="top-left"/>
    </div>
    <div style={blockStyle}>
    <Tooltip tooltipTrigger={lTrigger} tooltipText={minwidthTooltiptext} align="left"/>
    </div>
        <div style={blockStyle}>
    <Tooltip tooltipTrigger={rTrigger} tooltipText={minwidthTooltiptext} align="right"/>
    </div>
        <div style={blockStyle}>
    <Tooltip tooltipTrigger={blTrigger} tooltipText={minwidthTooltiptext} align="bottom-left"/>
    </div>
        <div style={blockStyle}>
    <Tooltip tooltipTrigger={brTrigger} tooltipText={maxwidthTooltiptext} align="bottom-right"/>
    </div>
            <div style={blockStyle}>
    <Tooltip tooltipTrigger={rtTrigger} tooltipText={maxwidthTooltiptext} align="right-top"/>
    </div>
            <div style={blockStyle}>
    <Tooltip tooltipTrigger={ltTrigger} tooltipText={maxwidthTooltiptext} align="left-top"/>
    </div>
        <div style={blockStyle}>
    <Tooltip tooltipTrigger={lbTrigger} tooltipText={maxwidthTooltiptext} align="left-bottom"/>
    </div>
        <div style={blockStyle}>
    <Tooltip tooltipTrigger={rbTrigger} tooltipText={maxwidthTooltiptext} align="right-bottom"/>
    </div>
    </div>
    );
    }
});

ReactDOM.render(<TooltipInstance />, mountNode);
