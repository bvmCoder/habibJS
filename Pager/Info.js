import * as React from 'react';
const styles = require('./style.less');
export default class Info extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let items = [];
        if (this.props.labels && this.props.labels.length > 0) {
            items = this.props.labels.map((value, index) => {
                return (<div key={index} className={styles.info} style={{ display: this.props.labelIndex === index ? 'block' : 'none' }}>
                            {value} &nbsp;
                        </div>);
            });
        }
        return (<div>
                {items}
            </div>);
    }
}
Info.propTypes = {
    labelIndex: React.PropTypes.number,
    labels: React.PropTypes.array
};
Info.defaultProps = {
    labelIndex: 0
};
