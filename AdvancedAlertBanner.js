const AdvancedAlertBannerInstance = React.createClass({
    getInitialState: () => {
        return { visible: false };
    },
    render() {
        const msgLinkStyle = {
            color: "white", cursor: "pointer", textDecoration: "underline"
        };
        const content = this.state.visible ?
               <AlertBanner
                   autoclose 
                   closeable
                   onClose={this.handleClose}
               >
                    <div>
                        <Icon icon="checkmark"/> &nbsp;
                        Advance Alert Banner with configurable Properties.&nbsp;
                        <Link style={msgLinkStyle} onClick={this.onUndoClickHandler}>Undo</Link><br/>
                        Click <Link style={msgLinkStyle} onClick={this.onMoreClickHandler}>Here</Link> for more details.
                    </div>
               </AlertBanner>
              : null;
        return (<div> { content } 
            <Link onClick={this.handleOpen}>Show Alert</Link>
          </div>);
    },
                                                      
    handleOpen() {
        if (this.state.visible !== true) {  
            this.setState({ visible: true });
        }
    },
    handleClose() {
        console.log("AlertBanner close Handler called..");
        this.setState({ visible: false });
    },
    onUndoClickHandler() {
        console.log("Clicked Undo link..");
        this.setState({ visible: false });
    },
    onMoreClickHandler() {
        console.log("Clicked More link..");
        this.setState({ visible: false });
    }
});

ReactDOM.render(<AdvancedAlertBannerInstance />, mountNode);
