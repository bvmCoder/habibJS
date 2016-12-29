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
        const columns = [
            this.createColumn('name'),
            this.createColumn('gender'),
            this.createColumn('company'),
            this.createColumn('email'),
            this.createColumn('phone'),
            this.createColumn('address')
        ];
        var tc = columns[columns.length - 1];
        tc.cellRenderedCallback = (td) => {
            this.refs.dataTable.renderIntoNode(<Button primary>Primary button</Button>, td);
        };
        return (<Table columns={columns} ref="dataTable" enableVerticalScroll={true}/>);
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
