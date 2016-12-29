const TableObjectData = React.createClass({
    
    componentDidMount() {
        superagent
            .get('/api/TableDataConverted')
            .end((err, res) => {
                const myArr = JSON.parse(res.text);
                this.refs.dataTable.setData(myArr.data);
            });
    },

    render() {
        const parentcol = this.createColumn('basic');
        parentcol.children = [this.createColumn('name'),
            this.createColumn('title')];
        let columns = [
            parentcol,
            this.createColumn('city'),
            this.createColumn('dateHired'),
            this.createColumn('dateHiredTicks'),
            this.createColumn('phone'),
            this.createColumn('salary'),
            this.createColumn('salaryNum')
        ];
        columns[1].sortField = 'dateHiredTicks';
        columns[5].sortField = 'salaryNum';
        return (<Table columns={columns} ref="dataTable" onColumnSortCallback={this.sortTable}/>);
    },
    sortTable(sort) {
        console.log(sort);
    },
    createColumn(dataField, headerText) {
        headerText = headerText || dataField;
        const tc = new TableColumn();
        tc.dataField = dataField;
        tc.headerText = headerText;
        return tc;
    }
});

ReactDOM.render(<TableObjectData />, mountNode);
