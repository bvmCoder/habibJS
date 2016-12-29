import * as React from 'react';
const styles = require('./style.less');

export default class ButtonToolbar extends React.Component {
    render() {
        let children = React.Children.map(this.props.children, (el, indx) => {
            return React.cloneElement(el, { className: styles.buttonToolbarItem, key: `item-${indx}` }, el.props.children);
        });
        return (<div className={styles.buttonToolbar} role='toolbar'>
          {children}
      </div>);
    }
}
