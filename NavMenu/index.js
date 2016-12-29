import * as React from 'react';
import NavItem from './NavItem';
import { setCssModule } from 'mdc-classnames';
const styles = require('./NavItem.less');
const cx = setCssModule.bind(styles);

export default class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataProvider: props.menuItems };
        this.handleUpdateActiveStatus = this.handleUpdateActiveStatus.bind(this);
    }
    componentDidMount() {
        this.updateActiveStatusByUrl = this.updateActiveStatusByUrl.bind(this);
        window.addEventListener('popstate', this.updateActiveStatusByUrl, false);
        if (window.eventEmitter) {
            window.eventEmitter.on('ROUTER.NAVIGATIONCOMPLETE', (/*url*/) => {
                this.updateActiveStatusByUrl();
            });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('popstate', this.updateActiveStatusByUrl, false);
        if (window.eventEmitter) {
            window.eventEmitter.removeListener('ROUTER.NAVIGATIONCOMPLETE');
        }
    }
    render() {
        const rows = [];
        this.state.dataProvider.forEach((item) => {
            rows.push(<NavItem itemData={item} onClickHandler={this.handleUpdateActiveStatus}/>);
        });
        const classes = cx({
            navMenu: true,
            topBorder: this.props.topBold
        });
        return (<div className={classes}>{rows}</div>);
    }

    handleUpdateActiveStatus(itemData) {
        const items = this.state.dataProvider;
        let updateStatusFlag = true;
        items.forEach((item) => { // eslint-disable-line complexity, max-statements
            let childSelected = false;
            let selectItem = null;
            if (item.children && item.children.length > 0) {
                item.children.forEach((subItem) => {
                    if (subItem === itemData) {
                        subItem.active = true;
                    } else if (item !== itemData) {
                        subItem.active = false;
                    }
                    if (subItem.active === true) {
                        childSelected = true;
                        selectItem = subItem;
                    }
                });
            }
            if (item === itemData || childSelected) {
                item.active = true;
                if (item.children && item.children.length > 0) {
                    if (!childSelected) {
                        item.children[0].active = true;
                        selectItem = item.children[0];
                    } else if (selectItem.target && selectItem.target === '_blank') {
                        updateStatusFlag = false;
                        return null;
                    }
                    if (selectItem.pjax) {
                        const label = selectItem.label;
                        const url = selectItem.url;
                        if (!window || !window.history || !window.eventEmitter) {
                            return null;
                        }
                        event.preventDefault();
                        if (!childSelected) {
                            history.pushState({}, label, url);
                            window.eventEmitter.emit('PJAX.NAVIGATION', { url });
                        } else if (event.target.tagName.toUpperCase() !== 'A') {
                            history.pushState({}, label, url);
                            window.eventEmitter.emit('PJAX.NAVIGATION', { url });
                        }
                    } else {
                        window.location.href = item.children[0].url;
                    }
                } else {
                    if (item.target && item.target === '_blank') {
                        updateStatusFlag = false;
                        return null;
                    }
                    const label = item.label;
                    const url = item.url;
                    if (item.pjax) {
                        if (!window || !window.history || !window.eventEmitter) {
                            return null;
                        }
                        event.preventDefault();
                        if (event.target.tagName.toUpperCase() !== 'A') {
                            history.pushState({}, label, url);
                            window.eventEmitter.emit('PJAX.NAVIGATION', { url });
                        }
                    } else {
                        window.location.href = url;
                    }
                }
            } else {
                item.active = false;
            }

            return null;
        });
        if (updateStatusFlag) {
            this.setState({ dataProvider: items });
        } else {
            updateStatusFlag = true;
        }

    }

    updateActiveStatusByUrl() {
        const url = window.location.href;
        const items = this.state.dataProvider;
        items.forEach((item) => {
            let childSelected = false;
            let selectItem = null;
            if (item.children && item.children.length > 0) {
                item.children.forEach((subItem) => {
                    if (subItem.url && url.indexOf(subItem.url) >= 0) {
                        subItem.active = true;
                    } else {
                        subItem.active = false;
                    }

                    if (subItem.active === true) {
                        childSelected = true;
                        selectItem = subItem;
                    }
                });
            }
            if (item.url && url.indexOf(item.url) >= 0 || childSelected) {
                item.active = true;
                if (childSelected && selectItem.pjax) {
                    //const label = selectItem.label;
                    const subItemurl = selectItem.url;
                    if (!window || !window.history || !window.eventEmitter) {
                        return;
                    }
                    event.preventDefault();
                    window.eventEmitter.emit('PJAX.NAVIGATION', { subItemurl });
                }
            } else {
                item.active = false;
            }
        });
        this.setState({ dataProvider: items });
    }
}

NavMenu.propTypes = {
    menuItems: React.PropTypes.array,
    topBold: React.PropTypes.bool
};

NavMenu.defaultProps = {
    menuItems: [],
    topBold: false
};
