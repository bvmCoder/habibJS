const items = [1, 2, 3].map((item, indx) => {
    return (<div key={indx}>Hello, world! I am {item}</div>);
});

const DrawersInstance = React.createClass({
    getInitialState: () => {
        return { visible: false };
    },
    render() {
        if (!this.state.visible) {
            return <a onClick={this.handleSelectItemChange}>click</a>;
        }
        return (<div>
                <a onClick={this.handleSelectItemChange}>click</a>
                <Drawers className="Feed_MyFollowsDrawer" onRequestClose={this.handleSelectItemChange} title="Financial Data Package">
                    <div className="Feed_MyFollowsDrawer_List">
                        <div className="Head">
                            <b>My FOLLOWS</b> RELATED TO THIS POST
                            <span>{items.length}</span>
                        </div>
                        {items}
                    </div>
                </Drawers>
            </div>);
    },
    handleSelectItemChange() {
        this.setState({ visible: !this.state.visible });
    }
});

ReactDOM.render(<DrawersInstance />, mountNode);
