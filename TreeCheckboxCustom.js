const TreeInstance = React.createClass({
    render() {
        const divStyle = { width: "25%", border: "1px solid" };
        return (<div style={divStyle}>
                <Tree onNodeCheckboxClick={this.onNodeCheckboxClick} checkbox>
                    <TreeNode title={this.getCustomTitle("Banking", 12450)}>
                        <TreeNode title="Chase"/>
                        <TreeNode title="Bank of America"/>
                    </TreeNode>
                    <TreeNode title={this.getCustomTitle("Insurance", 13450)}>
                        <TreeNode title="All State"/>
                        <TreeNode title="New York Life"/>
                        <TreeNode title="United Health"/>
                    </TreeNode>
                    <TreeNode title="Finance Companies"/>
                    <TreeNode title="Secutiry"/>
                    <TreeNode title="Real Estate"/>
                </Tree>
             </div>);
    },
    getCustomTitle(title, count) {
        const pullRight = { float: "right" };
        const pullLeft = { float: "left" };
        const clearBoth = { clear: "both" };
        return (<div>
                <div style={pullLeft}>{title}</div>
                <div style={pullRight}>{count}</div>
                <div style={clearBoth}></div>
            </div>);
    },
    onNodeCheckboxClick(node) {
        alert(node.title);
    }
});

ReactDOM.render(<TreeInstance />, mountNode);
