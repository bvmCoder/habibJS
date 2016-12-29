import React, { Component } from 'react';
//import { mapCalculateToIcon } from './lib';

const styles = {
    drillableDetailRow: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '35px',
        borderBottom: '1px solid rgba(216, 216, 216, 0.75)'
    },
    left: {
        display: 'flex',
        flex: 2,
        flexDirection: 'row'
    },
    right: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },
    rightContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        borderLeft: '1px solid rgba(216, 216, 216, 0.75)'
    },
    calculateAction: {
        display: 'flex',
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    value: {
        display: 'flex',
        flex: 13,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderLeft: '1px solid rgba(216, 216, 216, 0.75)',
        borderRight: '1px solid rgba(216, 216, 216, 0.75)'
    },
    filing: {
        display: 'flex',
        alignItems: 'center',
        flex: 5
    },
    names: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    name: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '35px',
        flex: 1.5,
        color: '#444',
        fontSize: '14px',
        padding: '5px'
    },
    description: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#191919'
    }
};

class DrillableDetailRow extends Component {
    render() {
        let nameSet = this.props.data.map((item, index) => {
            return (<div style={styles.name} key={index}>
                    {item.name}
                </div>);
        });
        let valueSet = this.props.data.map((item, index) => {
            return (
                <div style={Object.assign({}, styles.right, {
                    borderTop: index !== 0 ? '1px solid rgba(216, 216, 216, 0.75)' : '0px'
                })} key={index}
                >
                    {
                        this.props.AVGstyle
                        ? null
                        : <div style={styles.calculateAction}>
                             {item.calculateAction ? item.calculateAction : null}
                          </div>
                    }
                    <div style={styles.value}>
                        <p style={{margin: '0 10px 0 10px', fontSize: '13px'}}>
                            {item.value}
                        </p>
                    </div>
                    <div style={styles.filing}>{item.filing}</div>
                </div>);
        });
        return (
            <div style={styles.drillableDetailRow}>
                <div style={styles.left}>
                    <div style={Object.assign({}, styles.description, {
                        alignItems: this.props.AVGstyle ? 'flex-start' : 'center',
                        marginTop: this.props.AVGstyle ? '12px' : '0',
                        marginLeft: this.props.AVGstyle ? '40px' : '0',
                        justifyContent: this.props.AVGstyle ? 'flex-start' : 'center',
                        textAlign: this.props.AVGstyle ? 'left' : 'center'
                    })
                    }>
                        {this.props.description}
                    </div>
                    <div style={styles.names}>
                        {nameSet}
                    </div>
                </div>
                <div style={styles.rightContainer}>
                    {
                        this.props.AVGstyle
                        ? <div 
                            className="DrillDown-AVG-Cal"
                            style={{flex: 6, display: 'flex', justifyContent: 'center', paddingTop: '12px', fontSize: '12px'}}
                          >
                               {this.props.data[0].calculateAction ? this.props.data[0].calculateAction : null}
                          </div>
                        : null
                    }
                    <div style={{display: 'flex', flexDirection: 'column', flex: this.props.AVGstyle ? '18 1 2px' : 1}} >
                        {valueSet}
                    </div>
                </div>
            </div>
        );
    }
}

DrillableDetailRow.defaultProps = {
    valueCount: 1,
    description: null,
    data: [{
        name: null,
        value: null,
        // plus, minus, equal, null...
        calculateAction: null,
        filing: null
    }],
    AVGstyle: false
};

export default DrillableDetailRow;
