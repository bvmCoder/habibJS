const columns = [
    { title: '(All Ratios in Local Currency)', dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: <div>2006 31 DEC 2006</div>, children: [{ title: 'REPORTED', dataIndex: 'R2006', key: 'R2006' }, { title: 'ADJUSTED', dataIndex: 'A2006', key: 'A2006' }] },
    { title: <div>2007 31 DEC 2007</div>, children: [{ title: 'REPORTED', dataIndex: 'R2007', key: 'R2007' }, { title: 'ADJUSTED', dataIndex: 'A2007', key: 'A2007' }] },
    { title: <div>2008 31 DEC 2008</div>, children: [{ title: 'REPORTED', dataIndex: 'R2008', key: 'R2008' }, { title: 'ADJUSTED', dataIndex: 'A2008', key: 'A2008' }] },
    { title: <div>2009 31 DEC 2009</div>, children: [{ title: 'REPORTED', dataIndex: 'R2009', key: 'R2009' }, { title: 'ADJUSTED', dataIndex: 'A2009', key: 'A2009' }] },
    { title: <div>2010 31 DEC 2010</div>, children: [{ title: 'REPORTED', dataIndex: 'R2010', key: 'R2010' }, { title: 'ADJUSTED', dataIndex: 'A2010', key: 'A2010' }] },
    { title: <div>2011 31 DEC 2011</div>, children: [{ title: 'REPORTED', dataIndex: 'R2011', key: 'R2011' }, { title: 'ADJUSTED', dataIndex: 'A2011', key: 'A2011' }] },
    { title: <div>2012 31 DEC 2012</div>, children: [{ title: 'REPORTED', dataIndex: 'R2012', key: 'R2012' }, { title: 'ADJUSTED', dataIndex: 'A2012', key: 'A2012' }] },
    { title: <div>2013 31 DEC 2013</div>, children: [{ title: 'REPORTED', dataIndex: 'R2013', key: 'R2013' }, { title: 'ADJUSTED', dataIndex: 'A2013', key: 'A2013' }] },
    { title: <div>2014 31 DEC 2014</div>, children: [{ title: 'REPORTED', dataIndex: 'R2014', key: 'R2014' }, { title: 'ADJUSTED', dataIndex: 'A2014', key: 'A2014' }] },
    { title: <div>2015 31 DEC 2015</div>, children: [{ title: 'REPORTED', dataIndex: 'R2015', key: 'R2015' }, { title: 'ADJUSTED', dataIndex: 'A2015', key: 'A2015' }] }
];
const createData = function () {
    const count = 5;
    const datas = [];
    for (let i = 0; i < count; i++) {
        const data = { key: i, name: 'Net Interest Margin ' + (i + 1), R2006: '0.48 %', A2006: '0.48 %', R2007: '0.55 %', A2007: '0.55 %', R2008: '0.67 %', A2008: '0.95 %', R2009: '0.74 %', A2009: '1.42 %', R2010: '0.97 %', A2010: '1.60 %', R2011: '0.96 %', A2011: '1.43 %', R2012: '0.82 %', A2012: '1.36 %', R2013: '0.87 %', A2013: '1.33 %', R2014: '0.95 %', A2014: '1.43 %', R2015: '1.01 %', A2015: '1.56 %' };
        datas.push(data);
    }
    return datas;
};
const data = createData();
ReactDOM.render(<ReactTable columns={columns} className="bordered" data={data} enableColumnDraggable/>, mountNode);
