const TreeInstance = React.createClass({
    render() {
        return (<Tree title="Financial Institutions" onCollpaseExpandClick={this.onCollpaseExpandClick}>
                <TreeNode title="Banking">
                    <TreeNode title="Chase"/>
                    <TreeNode title="Bank of America"/>
                </TreeNode>
                <TreeNode title="Insurance">
                    <TreeNode title="All State"/>
                    <TreeNode title="New York Life"/>
                    <TreeNode title="United Health"/>
                </TreeNode>
                <TreeNode title="Finance Companies"/>
                <TreeNode title="Secutiry"/>
                <TreeNode title="Real Estate"/>
            </Tree>);
    },
    onCollpaseExpandClick(node) {
        alert(node.title);
    }
});

ReactDOM.render(<TreeInstance />, mountNode);
