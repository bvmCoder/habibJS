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
        return (<Table columns={columns} ref="dataTable" rowGroupingField="gender" leftLockedCount={1} height="500px" width="800px" enableScroll enablePaging={false} enableSearch={false} enableShowTotalCount={false} enableOrdering={false}/>);
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
