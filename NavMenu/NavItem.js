import * as React from 'react';
import NavLink from './NavLink';
import { setCssModule } from 'mdc-classnames';
const styles = require('./NavItem.less');
const cx = setCssModule.bind(styles);

export default class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const itemData = this.props.itemData;
        const classes = cx({
            itemactive: itemData.active,
            itemnoactive: !itemData.active
        });
        const hasChildren = (itemData.children && itemData.children.length > 0) ? true : false;
        return (<li className={classes} onClick={(event) => { // eslint-disable-line react/jsx-no-bind
            this.clickHandler(event, itemData); 
        }} >
            <NavLink linkData={itemData} hasChildren={hasChildren}/>
            {this.getChildren()}
          </li>);
    }
    clickHandler(event, data) {
        if (!event || data.disabled || data.active) {
            return;
        }
        event.stopPropagation();
        if (!data.onClick) {
            this.props.onClickHandler(data);
        }
    }
    getChildren() {
        const itemData = this.props.itemData;
        const hasChildren = (itemData.children && itemData.children.length > 0) ? true : false;
        if (!hasChildren || itemData.active !== true || itemData.disabled === true) {
            return null;
        }
        const rows = [];
        itemData.children.forEach((item) => {
            const classes = cx({
                disabled: item.disabled,
                selected: item.active
            });
            rows.push(<li className={classes} onClick={(event) => { // eslint-disable-line react/jsx-no-bind
                this.clickHandler(event, item); 
            }}>
            <NavLink linkData={item} hasChildren={false}/></li>);
        });

        return (<ul className={styles.children}>{rows}</ul>);
    }
}

NavItem.propTypes = {
    itemData: React.PropTypes.object,
    onClickHandler: React.PropTypes.func
};
