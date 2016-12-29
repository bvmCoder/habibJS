const LiteTableTreeViewDemo = React.createClass({
    render() {
        return (<LiteTable ref="table1" style={{ width: 768 }} options={{
            scrollX: true,
            scrollXInner: "1505px",
            data: dataSet, /* eslint no-use-before-define: 0 */
            columns: [
                { width: '100px', data: 'name' },
                { width: '400px', data: 'position' },
                { data: 'office' },
                { width: '400px', data: 'extn' },
                { width: '400px', data: 'date' },
                { width: '100px', data: 'salary' }
            ],
            fixedColumns: {
                leftColumns: 1,
                rightColumns: 1
            },
            fixedRows: true,
            rowGroupingIndex: 2,
            treeView: {
                identSize: 20
            }
        }}>
            <thead>
                <tr><th rowSpan="2">Name</th><th colSpan="4">Info</th><th rowSpan="2">Salary</th></tr>
                <tr><th>Position</th><th>Office</th><th>Extn</th><th>Start date</th></tr>
            </thead>
            <tbody></tbody>
        </LiteTable>);
    }
});

var dataSet = [
    { name: "Tiger Nixon", depth: 1, position: "System Architect", office: "Edinburgh", extn: "5421", date: "2011/04/25", salary: "$320,800" },
    { name: "Cedric Kelly", depth: 2, position: "Senior Javascript Developer", office: "Edinburgh", extn: "6224", date: "2012/03/29", salary: "$433,060" },
    { name: "Sonya Frost", depth: 3, position: "Software Engineer", office: "Edinburgh", extn: "1667", date: "2008/12/13", salary: "$103,600" },
    { name: "Quinn Flynn", depth: 2, position: "Support Lead", office: "Edinburgh", extn: "9497", date: "2013/03/03", salary: "$342,000" },
    { name: "Tiger Nixon", depth: 1, position: "System Architect", office: "Tokyo", extn: "5421", date: "2011/04/25", salary: "$320,800" },
    { name: "Cedric Kelly", depth: 2, position: "Senior Javascript Developer", office: "Tokyo", extn: "6224", date: "2012/03/29", salary: "$433,060" },
    { name: "Sonya Frost", depth: 3, position: "Software Engineer", office: "Tokyo", extn: "1667", date: "2008/12/13", salary: "$103,600" },
    { name: "Quinn Flynn", depth: 3, position: "Support Lead", office: "Tokyo", extn: "9497", date: "2013/03/03", salary: "$342,000" },
    { name: "Tiger Nixon", depth: 1, position: "System Architect", office: "New York", extn: "5421", date: "2011/04/25", salary: "$320,800" },
    { name: "Cedric Kelly", depth: 2, position: "Senior Javascript Developer", office: "New York", extn: "6224", date: "2012/03/29", salary: "$433,060" },
    { name: "Sonya Frost", depth: 3, position: "Software Engineer", office: "New York", extn: "1667", date: "2008/12/13", salary: "$103,600" },
    { name: "Quinn Flynn", depth: 4, position: "Support Lead", office: "New York", extn: "9497", date: "2013/03/03", salary: "$342,000" }
];

ReactDOM.render(<LiteTableTreeViewDemo />, mountNode);
