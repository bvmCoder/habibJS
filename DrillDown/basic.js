const { Drillable, DrillableDetailRow, DrillDownFooter, DrillDownHeader } = DrillDown;

const styles = {
    drillable: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '900px'
    }
};

const data = {
    reportedData: [{
        name: 'Noncontrolling interest - minority interest',
        value: 2.15,
        calculateAction: '+',
        filing: null
    }],
    adjustmentData: [{
        name: 'Noncontrolling interest',
        value: 1.1,
        calculateAction: '+',
        filing: null
    }, {
        name: 'Hybird sec',
        value: 0.3,
        calculateAction: '+',
        filing: null
    }],
    adjustedData: [{
        name: 'Noncontrolling interest - minority interest',
        value: 2.15,
        calculateAction: '+',
        filing: null
    }]
};

class Drilldown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationData: null,
            accountData: null,
            collapse: false
        };
        this.onDrill = this.onDrill.bind(this);
        this.renderChildDirllable = this.renderChildDirllable.bind(this);
        this.renderDetailRow = this.renderDetailRow.bind(this);
        this.onCollapsePressed = this.onCollapsePressed.bind(this);
    }
    renderChildDirllable(currentLevel) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    <Drillable key={1} level={currentLevel + 1} hasChildDrillable={true} childDrillableNumber={3} name={'Common Shares'} value={45.23} calculateAction={'+'} onDrill={() => this.onDrill(false, currentLevel + 1, null)}/>,
                    <Drillable key={2} level={currentLevel + 1} hasChildDrillable={true} childDrillableNumber={3} name={'Retained earning'} value={45.23} calculateAction={'+'} onDrill={() => this.onDrill(false, currentLevel + 1, null)}/>
                ]);
            }, 2000);
        });
    }
    renderDetailRow() {
        return ([
            <DrillableDetailRow key={1} description="As Reported" data={data.reportedData}/>,
            <DrillableDetailRow key={2} description="Standard Adjustment" data={data.adjustmentData}/>,
            <DrillableDetailRow key={3} description="As Adjust" data={data.adjustedData}/>
        ]);
    }
    onDrill(hasChildDrillable, currentLevel, flag) {
        return new Promise((resolve1) => {
            if (hasChildDrillable) {
                this.renderChildDirllable(currentLevel, flag)
                    .then((res) => resolve1(res));
            } else {
                resolve1(this.renderDetailRow(flag));
            }
        });
    }
    onCollapsePressed() {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    render() {
        return (<div style={styles.drilldown} className="drilldown">
                <DrillDownHeader collapsed={this.state.collapsed} onCollapse={this.onCollapsePressed}/>
                <Drillable level={1} childType={'drillable'} name={'Common Equity'} value={45.23} calculateAction={'+'} onDrill={() => this.onDrill(true, 1, null)} collapse={this.state.collapse}/>
                <Drillable level={1} childType={'drillable'} name={'Goodwill'} value={7.91} calculateAction={'+'} onDrill={() => this.onDrill(true, 1, null)} collapse={this.state.collapse}/>
                <Drillable level={1} childType={'LookBack'} name={'Noncontrolling interest'} value={22.64} calculateAction={'+'} onDrill={() => this.onDrill(false, 1, null)} collapse={this.state.collapse}/>
                <DrillDownFooter name={'Cost of Goods / Products'} value={45.82}/>
            </div>);
    }
}

ReactDOM.render(<Drilldown />, mountNode);
