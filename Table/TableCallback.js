const TableObjectData = React.createClass({
    componentDidMount() {
        superagent
            .get('/api/TableObjectData')
            .end((err, res) => {
                const myArr = JSON.parse(res.text);
                this.refs.dataTable.setData(myArr.data);
            });
    },
    cellClickCallback(td) {
        alert('You clicked' + td.innerHTML);
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
        return (<Table columns={columns} ref="dataTable" rowGroupingField="gender" enableScroll={true} cellClickCallback={this.cellClickCallback}/>);
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
