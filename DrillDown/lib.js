import React from 'react';
/* eslint-disable */
const mapMonetaryToNum = (Monetary) => {
    //"175892000.00000000"
    const arr = Monetary.split('.');
    const int = arr[0];
    let float = arr[1];
    float = float.substr(0, 2);
    return `${int}.${float}`;
};

const styles = {
    icon: {
        fontSize: '16px',
        color: '#444',
        textAlign: 'center'
    }
};

const mapCalculateToIcon = (type) => {
    switch (type) {
        case 'plus':
            return (<div style={Object.assign({}, styles.icon, { fontFamily: 'Whitney Ssm Light' })}>+</div>);
        case 'minus':
            return (<div style={styles.icon}>-</div>);
        case 'equal':
            return (<div style={styles.icon}>=</div>);
        case '/':
            return (<div style={styles.icon}>/</div>);
        case '*':
            return (<div style={styles.icon}>×</div>);
        case 'rightArrow':
            return (<div style={styles.icon}>{'>'}</div>);
        case 'downArrow':
            return (<div style={Object.assign({}, styles.icon, { transform: 'rotate(90deg)' })}>{'>'}</div>);
        default:
            return null;
    }
};

module.exports = { mapCalculateToIcon, mapMonetaryToNum };
