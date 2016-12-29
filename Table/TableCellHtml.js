const TableObjectData = React.createClass({
    componentDidMount() {
        superagent
            .get('/api/TableObjectData')
            .end((err, res) => {
                const myArr = JSON.parse(res.text);
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
        const tc = columns[columns.length - 1];
        tc.cellHtmlCallback = (data) => {
            return "<a href='http://www.google.com' onclick=''>" + data + "</a><div class='triangle-up-right'></div>";
        };
        return (<Table columns={columns} ref="dataTable" enableScroll={true}/>);
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
