const TableObjectData = React.createClass({
    componentDidMount() {
        superagent
            .get('/api/TableObjectData')
            .end((err, res) => {
                const myArr = JSON.parse(res.text);
                this.refs.dataTable.setFixedColumnData(myArr.data, this.refs.dataTable.setDataMultiHierarchy);
            });
    },
    render() {
        let columns = [
            { headerText: "Basic", children: [this.createColumn("name")] },
            this.createColumn("gender"),
            { headerText: "2016", children: [this.createColumn("company"), this.createColumn("email")] },
            { headerText: "2015", children: [this.createColumn("phone"), this.createColumn("Position")] },
            { headerText: "2014", children: [this.createColumn("phone"), this.createColumn("Position")] },
            { headerText: "2013", children: [this.createColumn("phone"), this.createColumn("Position")] },
            { headerText: "2012", children: [this.createColumn("phone"), this.createColumn("Position")] }
        ];
        return (<div>
         <Table columns={columns} removeFirstGroupRow rowGroupingField="gender" fixedColumn={1} ref="dataTable" enableScroll height={1800} enablePaging={false} enableSearch={false} enableShowTotalCount={false} enableOrdering={false} enableFixedHeader={true}/>
      </div>);
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
