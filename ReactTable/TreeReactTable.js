class TreeTable extends React.Component {
    constructor() {
        super();
        this.onExpand = this.onExpand.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            reported: true
        };
        this.columns = [{ 
            title: <div>
                       <CheckBox text="Reported" value="Reported" checked onclick={this.onClick} name="Reported" />
                   </div>, 
            dataIndex: 'name', 
            key: 'name', 
            fixed: 'left'
        }, { 
            title: <div>2006 31 DEC 2006</div>, 
            children: [{ title: 'REPORTED', dataIndex: 'R2006', key: 'R2006' }, { title: 'ADJUSTED', dataIndex: 'A2006', key: 'A2006' }]
        }, { 
            title: <div>2007 31 DEC 2007</div>,
            children: [{ title: 'REPORTED', dataIndex: 'R2007', key: 'R2007' }, { title: 'ADJUSTED', dataIndex: 'A2007', key: 'A2007' }]
        }];
        this.data = [{
            key: 1,
            name: 'Net Interest Margin',
            R2006: '0.66 %',
            A2006: '0.43 %',
            R2007: '0.55 %',
            A2007: '1.23 %',
            children: [{
                key: 2,
                name: 'Net Interest Margin',
                R2006: '0.66 %',
                A2006: '0.43 %',
                R2007: '0.55 %',
                A2007: '1.23 %',
                children: [{
                    key: 3,
                    name: 'Net Interest Margin',
                    R2006: '0.66 %',
                    A2006: '0.43 %',
                    R2007: '0.55 %',
                    A2007: '1.23 %'
                }]
            }]
        }, {
            key: 4,
            name: 'Net Interest Margin',
            R2006: '0.66 %',
            A2006: '0.43 %',
            R2007: '0.55 %',
            A2007: '1.23 %'
        }];
    }
    onClick() {
        if (this.state.reported === true) {
            this.columns = [{ 
                title: <div>
                            <CheckBox text="Reported" value="Reported" checked onclick={this.onClick} name="Reported" />
                        </div>, 
                dataIndex: 'name', 
                key: 'name', 
                fixed: 'left'
            }, { 
                title: <div>2006 31 DEC 2006</div>, 
                children: [{ title: 'ADJUSTED', dataIndex: 'A2006', key: 'A2006' }]
            }, { 
                title: <div>2007 31 DEC 2007</div>,
                children: [{ title: 'ADJUSTED', dataIndex: 'A2007', key: 'A2007' }]
            }];
            this.setState({reported: false});
        } else {
            this.columns = [{ 
                title: <div>
                        <CheckBox text="Reported" value="Reported" checked onclick={this.onClick} name="Reported" />
                    </div>, 
                dataIndex: 'name', 
                key: 'name', 
                fixed: 'left'
            }, { 
                title: <div>2006 31 DEC 2006</div>, 
                children: [{ title: 'REPORTED', dataIndex: 'R2006', key: 'R2006' }, { title: 'ADJUSTED', dataIndex: 'A2006', key: 'A2006' }]
            }, { 
                title: <div>2007 31 DEC 2007</div>,
                children: [{ title: 'REPORTED', dataIndex: 'R2007', key: 'R2007' }, { title: 'ADJUSTED', dataIndex: 'A2007', key: 'A2007' }]
            }];
            this.setState({reported: true});
        }
    }
    onExpand(expanded, record) {
        console.log('onExpand', expanded, record);
    }
    render() {
        return (
            <ReactTable columns={this.columns} data={this.data} onExpand={this.onExpand} enableColumnDraggable />
        );
    }
}

ReactDOM.render(
  <TreeTable />,
  mountNode
);