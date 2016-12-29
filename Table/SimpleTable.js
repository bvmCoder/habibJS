const TableObjectData = React.createClass({
    render() {
        let columns = [
            this.createColumn('name'),
            this.createColumn('gender'),
            this.createColumn('company')
        ];

        return (<div>
              <Table columns={columns} isLoading={false} ref="dataTable1"/>
              <div style={{ marginTop: '80px' }}>
                <Table columns={columns} isLoading={true} ref="dataTable2"/>
              </div>
        </div>);
    },
    componentDidMount() {
        this.refs.dataTable1.setData([
            { name: "Tom", gender: "male", company: "MIS" },
            { name: "Tim", gender: "male", company: "MIT" }
        ]);
        this.refs.dataTable2.setData([
            { name: "Anne", gender: "female", company: "MIS" },
            { name: "Maria", gender: "female", company: "MIT" }
        ]);
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
