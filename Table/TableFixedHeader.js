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
        const parentcol = this.createColumn('basic');
        parentcol.children = [this.createColumn('name'),
            this.createColumn('gender')];
        let columns = [
            parentcol,
            this.createColumn('company'),
            this.createColumn('email'),
            this.createColumn('phone'),
            this.createColumn('address')
        ];
        return (<Table columns={columns} ref="dataTable" rowGroupingField="gender" enableFixedHeader={true}/>);
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
