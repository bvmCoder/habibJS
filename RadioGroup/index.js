import * as React from 'react';
const styles = require('./style.less');
export default class RadioGroup extends React.Component {
    render() {
        let children = React.Children.map(this.props.children, (el) => {
            return React.cloneElement(el, { className: styles.radioGroupItem }, el.props.children);
        });
        return (<div className={styles.radioGroup} role='group'>
          {children}
      </div>);
    }
}
