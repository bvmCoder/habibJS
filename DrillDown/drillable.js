import React, { Component } from 'react';
import { mapCalculateToIcon } from './lib';
import Spinner from '../Spinner';

const styles = {
    drillable: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '35px',
        borderBottom: '1px solid rgba(216, 216, 216, 0.75)'
    },
    name: {
        marginLeft: '10px',
        color: '#191919',
        fontSize: '14px'
    },
    left: {
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    children: {
        display: 'flex',
        flexDirection: 'column'
    }
};

class DefaultLoadingView extends Component {
    render() {
        return (<div style={{ display: 'flex', flex: 1, padding: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner size={50} speed={1.6}/>
            </div>);
    }
}
export default class Drillable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrilled: false,
            child: null,
            loading: false
        };
        this.onDrill = this.onDrill.bind(this);
    }
    onDrill() {
        if (!this.state.child) {
            this.setState({
                loading: true
            });
            console.log(typeof (this.props.onDrill()));
            this.props.onDrill()
                .then((data) => {
                    this.setState({
                        child: data,
                        loading: false
                    });
                })
                .catch((err) => { console.error(err); });
        }
        this.setState({
            isDrilled: !this.state.isDrilled
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.collapse !== this.props.collapse) {
            this.setState({
                isDrilled: false
            });
        }
    }
    /* eslint-disable */
    render() {
        const { childType, level, value, calculateAction } = this.props;
        let bgColor;
        if (level === 1) {
            bgColor = '#F0F4FA';
        } else if (level === 2) {
            bgColor = '#FEFDFB';
        } else {
            bgColor = '#fff';
        }
        if (this.props.backgroundColor) {
            bgColor = this.props.backgroundColor;
        }
        return (<div style={styles.container} className="Neptune-DrillDown">
                <div style={Object.assign({}, styles.drillable, { backgroundColor: bgColor })}>
                    <div style={styles.left}>
                        <div style={{
                            marginLeft: (level) * 20 + 'px',
                            opacity: childType === "LookBack" ? 0 : 1,
                            cursor: childType === "LookBack" ? 'default' : 'pointer'
                        }} onClick={childType === "LookBack" ? null : this.onDrill}
                        >
                            {this.state.isDrilled ? mapCalculateToIcon('downArrow') : mapCalculateToIcon('rightArrow')}
                        </div>
                        <div style={styles.name}>
                            {this.props.name}
                        </div>
                    </div>
                    <div style={styles.right}>
                        <div style={styles.calculateAction}>
                            {
                                calculateAction
                                ? calculateAction
                                : null
                            }
                        </div>
                        <div style={styles.value}>
                            <p style={{margin: '0 10px 0 10px', fontSize: '13px'}}>
                                {value}
                            </p>
                        </div>
                        <div style={styles.filing}></div>
                    </div>
                </div>
                <div style={Object.assign({}, styles.children, { display: this.state.isDrilled ? 'flex' : 'none' })}>
                    {this.state.child}
                </div>
                {
                    this.state.loading
                    ? this.props.loadingView || null
                    : null
                }
            </div>
            );
    }
}
Drillable.defaultProps = {
    //what level is the drillable
    level: 1,
    childType: null,
    onDrill: () => { },
    name: null,
    value: null,
    // plus, minus, equal, null...
    calculateAction: null,
    // if a drillable need the sum row when drill
    needSum: false,
    filing: null,
    collapse: false,
    loadingView: <DefaultLoadingView />,
    backgroundColor: null
};
