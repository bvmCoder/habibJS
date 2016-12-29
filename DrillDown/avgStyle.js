const { Drillable, DrillableDetailRow, DrillDownFooter, DrillDownHeader } = DrillDown;

const AVGdata = [{
    name: 'Q1 2016 TYD',
    value: "14.00",
    calculateAction: '/AVG',
    filing: null
}, {
    name: 'Q2 2016 TYD',
    value: "14.23",
    calculateAction: 'plus',
    filing: null
}, {
    name: 'Q3 2016 TYD',
    value: "14.88",
    calculateAction: 'plus',
    filing: null
}, {
    name: 'FY 2015',
    value: "11.23",
    calculateAction: 'plus',
    filing: null
}];

class AVGDrilldown extends React.Component {
    render() {
        return (
          <div className="drilldown">
              <DrillDownHeader />
              <Drillable level={1} childType={"LookBack"} name={'Loan Loss Provisions'} value={"4.18"} calculateAction={null} />
              <DrillableDetailRow description="Allowance for loan losses" data={AVGdata} AVGstyle={true} />
              <DrillDownFooter name={'Cost of Goods / Products'} value={"39.86 %"}/>
          </div>
        );
    }
}

ReactDOM.render(<AVGDrilldown />, mountNode);