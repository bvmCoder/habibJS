const PagerInstance = React.createClass({
    getInitialState: () => {
        return { currentIndex: 0 };
    },
    render() {
        const config = {
            pageSize: 50
        };

        const pageGenerateMessage = (currentIndex) => {
            const data = [];
            const startPage = currentIndex * config.pageSize + 1;
            const totalCount = 2400;
            const endPage = (currentIndex + 1) * config.pageSize > totalCount ? totalCount : (currentIndex + 1) * config.pageSize;
            const selectedCount = endPage - startPage + 1;
            data.push('Displaying:  ' + startPage + '  to  ' + endPage + '  of  ' + totalCount + '  Follows');
            data.push('All  ' + selectedCount + '  Follows on this page are selected.');
            data.push('All  ' + totalCount + '  follows are selected.');
            return data;
        };

        return (<Pager onPageSelect={this.handleSelectItemChange} currentIndex={this.state.currentIndex} totalCount={2400} pageSize={config.pageSize} labels={pageGenerateMessage(this.state.currentIndex)}/>);
    },
    handleSelectItemChange(pageNum) {
        this.setState({ currentIndex: pageNum - 1 });
    }
});

ReactDOM.render(<PagerInstance />, mountNode);
