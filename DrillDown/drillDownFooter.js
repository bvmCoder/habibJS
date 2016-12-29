import React, { Component } from 'react';
import { mapCalculateToIcon } from './lib';

const styles = {
    row: {
        display: 'flex',
        minHeight: '35px',
        flexDirection: 'row',
        borderTop: '2px solid rgba(216, 216, 216, 0.75)',
        borderBottom: '1px solid rgba(216, 216, 216, 0.75)'
    },
    left: {
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px'
    },
    right: {
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
    }
};

class DrillDownFooter extends Component {
    render() {
        return (
            <div style={styles.row}>
                <div style={styles.left}>{this.props.name}</div>
                <div style={styles.right}>
                    <div style={styles.calculateAction}>{mapCalculateToIcon(this.props.calculateAction)}</div>
                    <div style={styles.value}>
                        <p style={{margin: '0 10px 0 10px', fontSize: '13px'}}>
                            {this.props.value}
                        </p>
                    </div>
                    <div style={styles.filing}></div>
                </div>
            </div>
        );
    }
}

DrillDownFooter.defaultProps = {
    name: null,
    calculateAction: 'equal',
    value: null
};

export default DrillDownFooter;
