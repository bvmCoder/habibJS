const TreeInstance = React.createClass({
    render() {
        return (<Tree title="Financial Institutions" onNodeCheckboxClick={this.onNodeCheckboxClick} checkbox>
                <TreeNode title="Banking" id="bank1">
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
    onNodeCheckboxClick(node) {
        console.log(node);
    }
});

ReactDOM.render(<TreeInstance />, mountNode);
