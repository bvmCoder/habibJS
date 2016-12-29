const TableInstance = React.createClass({
    componentDidMount() {
        superagent
            .get('/api/TableData')
            .end((err, res) => {
                var myArr = JSON.parse(res.text);
                this.refs.dataTable.setDataArray(myArr.data);
            });
    },
    render() {
        let columns = [
            { headerText: "Basic", children: [{ headerText: "Name" }, { headerText: "Position" }] },
            { headerText: "Office" },
            { headerText: "Extn." },
            { headerText: "Start date" },
            { headerText: "Salary" }
        ];
        return (<Table columns={columns} ref="dataTable"/>);
    }
});

ReactDOM.render(<TableInstance />, mountNode);
