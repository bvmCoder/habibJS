const TableObjectData = React.createClass({
    componentDidMount() {
        superagent
            .get('/api/TableObjectData')
            .end((err, res) => {
                var myArr = JSON.parse(res.text);
                this.refs.dataTable.setData(myArr.data);
            });
    },
    render() {
        let columns = [
            this.createColumn('name'),
            this.createColumn('gender'),
            this.createColumn('company'),
            this.createColumn('email'),
            this.createColumn('phone'),
            this.createColumn('address')
        ];
        return (<Table columns={columns} leftLockedCount={1} ref="dataTable" width="800px"/>);
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
