import * as React from 'react';
const styles = require('./style.less');
export default class ViewHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        const prev = props.prev;
        const next = props.next;
        const titleAction = props.titleAction;
        const data = props.data;
        this.state = {
            prev,
            next,
            titleAction,
            data
        };
    }
    render() {
        return (<div className={styles['navigation-title-wrapper']}>
          <span className={styles['icon-style']} onClick={this.props.prev}>&lt;</span>
          <span className={styles['navigation-title']} onClick={this.props.titleAction}>{this.props.data}</span>
          <span className={styles['icon-style']} onClick={this.props.next}>&gt;</span>
       </div>);
    }
}
ViewHeader.propTypes = {
    data: React.PropTypes.any,
    next: React.PropTypes.func,
    prev: React.PropTypes.func,
    titleAction: React.PropTypes.func
};
