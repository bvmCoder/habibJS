import React, { Component } from 'react';

const styles = {
    row: {
        display: 'flex',
        minHeight: '28px',
        flexDirection: 'row',
        borderTop: '1px solid rgba(216, 216, 216, 0.75)'
    },
    left: {
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        textTransform: 'uppercase'
    },
    right: {
        display: 'flex',
        flex: 1,
        borderLeft: '1px solid rgba(216, 216, 216, 0.75)',
        flexDirection: 'row'
    },
    currency: {
        display: 'flex',
        flex: '19 1 1px',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        borderRight: '1px solid rgba(216, 216, 216, 0.75)',
        fontSize: '10px',
        letterSpacing: '1px'
    },
    filing: {
        display: 'flex',
        flex: 5,
        textTransform: 'uppercase',
        alignItems: 'center'
    },
    collapse: {
        color: 'rgb(205,156,84)',
        paddingLeft: '20px',
        paddingRight: '20px',
        fontSize: '10px',
        letterSpacing: '1px',
        cursor: 'pointer'
    }
};

class DrillDownHeader extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.onCollapse();
    }
    render() {
        return (<div style={styles.row}>
                <div style={styles.left}>
                    <div style={styles.collapse} onClick={this.onClick}>
                        {this.props.collapsed
            ? 'uncollapse all'
            : 'collapse all'}
                    </div>
                </div>
                <div style={styles.right}>
                    <div style={styles.currency}>{this.props.currency}</div>
                    <div style={styles.filing}>
                        <div style={{ paddingLeft: '10px', fontSize: '10px', letterSpacing: '1px' }}>
                            {'filing'}
                        </div>
                    </div>
                </div>
            </div>);
    }
}

DrillDownHeader.defaultProps = {
    currency: 'USD/BILLIONS',
    onCollapse: () => { },
    collapsed: false
};

export default DrillDownHeader;
