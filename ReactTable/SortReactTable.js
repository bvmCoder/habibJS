import * as _ from "lodash";

class SortReactTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
        this.sortOrder = this.sortOrder.bind(this);
    }
    
    sortOrder(name, currSortOrder, event) {
        let data = this.props.data;
        const item = this.props.sortColumns.find((o) => o.columnName === name);
        if (item) {
            data = _.orderBy(data, [name.toLowerCase()], [currSortOrder]);
        }
        this.setState({data});
        console.log(`column: ${name}, Index: ${currSortOrder}, event: ${event.target}`);
    }

    render() {
        const {columns, sortColumns} = this.props;
        return (
            <ReactTable 
                columns={columns} 
                data={this.state.data} 
                sortOrder={this.sortOrder}
                sortColumns={sortColumns}
            />
        );
    }
}

const columns = [
    {title: "Name", dataIndex: "name", key: "name", width: 400},
    {title: "Type", dataIndex: "type", key: "type", width: 100},
    {title: "Email Setting", dataIndex: "emailSetting", key: "emailSetting", width: 320},
    {title: "Date Time", dataIndex: "datetime", key: "datetime", width: 150}
];

const datas = [
    {
        name: "Sectors 2014-02-17 16:10:53 Dveadgovd Izkgvtcws Rwjvyhjw Gxzquge Ayzkkdjm", type: 3, emailSetting: 2, datetime: "2004-05-07 15:44:40"
    },
    {
        name: "Issuer 2004-05-07 15:44:40 Jmps Behkoionkn Fxqzsk Xpkplv", type: 2, emailSetting: 2, datetime: "2004-05-07 15:44:40"
    },
    {
        name: "Issuer 1984-08-20 12:34:17 Louiciw Lrn Rhjmrb Tiom Hanxwedu Qgjzbxe Frsqh", type: 2, emailSetting: 2, datetime: "1984-08-20 12:34:17"
    },
    {
        name: "Issuer 1973-03-03 02:11:42 Scewsnfbw Fzxs Ojxyuhopb Lnekgufly Fpb Yfexutbgt", type: 1, emailSetting: 2, datetime: "1973-03-03 02:11:42"
    },
    {
        name: "Issuer 1999-11-02 12:26:38 Ryys Giliyirx Xwbg Utrs", type: 2, emailSetting: 2, datetime: "1999-11-02 12:26:38"
    },
    {
        name: "Issuer 1988-12-24 11:26:19 Nivfi Kdglhkbgw Nujokcxvx Ksuaa Pkgy", type: 1, emailSetting: 2, datetime: "1988-12-24 11:26:19"
    },
    {
        name: "Issuer 1992-11-14 06:08:36 Ejafb Ebkjjalre Ptqbc Rbyb Eokqgbym Iwytvxjs", type: 1, emailSetting: 2, datetime: "1992-11-14 06:08:36"
    },
    {
        name: "Issuer 2016-09-13 02:34:53 Joi Dadvv Oyjopt", type: 2, emailSetting: 3, datetime: "2016-09-13 02:34:53"
    }
];

const arrowUp = <Icon icon="arrow-up"/>;
const arrowDown = <Icon icon="arrow-down" />;

const sortColumns = [
    {
        columnName: "Name",
        sortOrderOptions: [{sortOrder: "asc", icon: arrowUp}, {sortOrder: "desc", icon: arrowDown}],
        currSortOrder: "asc"
    }
];

ReactDOM.render(
  <SortReactTable 
      columns={columns} 
      data={datas} 
      sortColumns={sortColumns}
  />, mountNode);