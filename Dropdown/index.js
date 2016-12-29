const React = require("react");
const ReactDOM = require("react-dom");
const { PropTypes, Component } = React;
import Button from './../Button';
import ButtonToolbar from './../ButtonToolbar';
import CheckBox from './../CheckBox';
import Icon from './../Icon';
import { findDOMNode } from 'react-dom';
import { setCssModule } from 'mdc-classnames';
import Label from '../Label/index';
const styles = require('./style.less');
const _ = require('lodash');
const cx = setCssModule.bind(styles);

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            selectAll: false,
            showWidth: '100%'
        };

        if (this.props.multiselect) {
            this.state.checkItems = _.cloneDeep(this.props.optionItems); // eslint-disable-line react/no-direct-mutation-state
        } else {
            const selectedItems = this.props.optionItems.filter((item) => item.selected);
            this.state.activeItem = selectedItems[0] || this.props.optionItems[0]; // eslint-disable-line react/no-direct-mutation-state
        }

        this.checkItem = this.checkItem.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onWindowClick = this.onWindowClick.bind(this);
        this.onToggleClick = this.onToggleClick.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    toEllipse() {
        const refs = this.refs;
        const list = refs.itemList.children;
        _.each(list, (item) => {
            const divH = item.offsetHeight;
            const $span = item.children[0];
            let text = $span.innerHTML;
            const words = _.words(text);
            let lastIndex = words.length - 1;
            if (divH < 0) {
                return;
            }
            while ($span.offsetHeight > divH) {
                const index = text.lastIndexOf(words[lastIndex]);
                text = text.substring(0, index);
                $span.innerHTML = `${text}...`;
                lastIndex--;
            }
        });
    }
    adjustStylesPostRender() {
        this.refs.itemList.style.maxHeight = `${this.adjustHeight(this.refs.itemList.children)}px`;
        const dropContainerBounds = ReactDOM.findDOMNode(this.refs.itemsContainer).getBoundingClientRect();
        if (dropContainerBounds.bottom > window.innerHeight && (dropContainerBounds.bottom - dropContainerBounds.top) < window.innerHeight) {
            this.refs.itemsContainer.style.bottom = '100%';
        } else {
            this.refs.itemsContainer.style.bottom = '';
        }
    }
    componentDidMount() {
        window.addEventListener('click', this.onWindowClick);
        this.toEllipse();
        this.adjustStylesPostRender();
        const showWidth = this.refs.showInput.offsetWidth;
        this.setState({ showWidth: `${100 - 15 * 100 / showWidth}%` });        
    }
    componentDidUpdate() {
        this.adjustStylesPostRender();
        if (!this.state.preserveScroll) {
            this.refs.itemList.scrollTop = 0;
        }        
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.controlled) {
            return;
        }
        if (nextProps.optionItems && this.props.optionItems !== nextProps.optionItems) {
            if (this.props.multiselect) {
                this.setState({ checkItems: _.cloneDeep(this.props.optionItems) }); // eslint-disable-line react/no-direct-mutation-state
            } else {
                const selectedItems = this.props.optionItems.filter((item) => item.selected);
                this.setState({ activeItem: selectedItems[0] || this.props.optionItems[0] }); // eslint-disable-line react/no-direct-mutation-state
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }
    render() {
        const customWidth = {};
        const width = this.props.width === undefined ? '100%' : this.props.width;
        if (width) {
            customWidth.minWidth = width;
            customWidth.width = width;
        }

        const items = this.props.multiselect ? this.renderCheckboxItems() : this.renderSelectItems();
        const displaySelection = this.props.multiselect ?
            `${this.state.checkItems.filter((item) => item.selected).length} Selected` :
            this.state.activeItem.text;

        const classes = cx(this.props.className) + " " + styles.container;

        return (
            <div className={classes} onClick={this.onToggleClick}>
                <div className={styles.dropdown}>
                    <div className={cx(styles.title)} style={customWidth} >
                        <span className={styles.pull_left} style={{ width: this.state.showWidth }} ref='showInput'>
                            <Label className='Body-Secondary'>{displaySelection}</Label>
                        </span>
                        <span className={styles.pull_right}>
                            <Icon name="arrow-down" />
                        </span>
                    </div>
                    {items}
                </div>
            </div>
        );
    }
    renderCheckboxItems() {
        const style = {
            display: this.state.active ? 'inline' : 'none'
        };

        style.maxWidth = 285;

        const width = this.props.width === undefined ? '100%' : this.props.width;
        if (width) {
            style.minWidth = width;
            if (style.maxWidth < width) {
                style.maxWidth = width;
            }
        }

        const buttons = this.props.controlled ?
            <div className={styles.buttonsContainer}>
                <div className={styles.buttons}>
                    <ButtonToolbar>
                        <Button onClick={this.handleCancelClick}>CANCEL</Button>
                        <Button primary onClick={this.handleOkClick}>OK</Button>
                    </ButtonToolbar>
                </div>
            </div> : '';

        return (
            <div className={styles.itemsContainer} ref='itemsContainer' style={style} >
                <div className={styles.itemList} ref='itemList'>
                    <div className={styles.allItem} onClick={this.selectAll}>
                        <CheckBox text="All" readonly className={styles.allItemStrong} checked={this.state.selectAll} />
                    </div>
                    {this.state.checkItems.map((item) => {
                        return (
                            <div className={styles.item} 
                                onClick={ (e) => { // eslint-disable-line react/jsx-no-bind
                                    this.checkItem(e, item.selected, item.key);
                                }} 
                                key={item.key} title={item.text}
                            >
                                <CheckBox text={item.text} value={item.key} readonly checked={item.selected} />
                            </div>
                        );
                    })}
                </div>
                { buttons }
            </div>
        );
    }
    renderSelectItems() {
        const style = {
            display: this.state.active ? 'inline' : 'none'
        };

        style.maxWidth = 285;

        const width = this.props.width === undefined ? '100%' : this.props.width;
        if (width) {
            style.minWidth = width;
            if (style.maxWidth < width) {
                style.maxWidth = width;
            }
        }

        return (
            <div className={styles.itemsContainer} ref='itemsContainer' style={style}>
                <div className={styles.itemList} ref='itemList'>
                    {this.props.optionItems.map((item) => {
                        return (
                            <div className={styles.item} 
                                onClick={ (e) => { // eslint-disable-line react/jsx-no-bind
                                    this.selectItem(e, item);
                                }} 
                                key={item.key} title={item.text}
                            >
                                <Label className='Body-Secondary'>{item.text}</Label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    isActive() {
        return (typeof this.props.active === 'boolean') ? this.props.active : this.state.active;
    }
    hide() {
        this.setState({
            active: false,
            preserveScroll: false
        });
    }
    show() {
        this.setState({
            active: true
        });
    }
    adjustHeight(list) {
        let height = 0;
        for (let i = 0; i < 5 && i < list.length; i++) {
            height += list[i].offsetHeight;
        }
        return height + 2;
    }
    selectItem(e, item) {
        this.setState({ activeItem: item, active: false, preserveScroll: true });
        if (this.props.onChange) {
            this.props.onChange(item.key, this.props.optionItems);
        }
    }
    checkItem(e, checked, key) {
        if (e.target.nodeName !== "DIV" && e.target.nodeName !== "INPUT") { // div element containing checkbox and input of checkbox
            e.preventDefault();
        }
        const currentStateItems = this.state.checkItems;
        let selectAll = true;

        const newItems = currentStateItems.map((item) => {
            if (item.key === key) {
                item.selected = !checked;
            } 

            if (selectAll && !item.selected) {
                selectAll = false;
            }

            return item;
        });

        this.setState({ checkItems: newItems, selectAll, preserveScroll: true });
    }
    selectAll(e) {
        if (e.target.nodeName !== "DIV" && e.target.nodeName !== "INPUT") { // div element containing checkbox and input of checkbox
            e.preventDefault();
        }

        const newItems = this.state.checkItems.map((item) => {
            item.selected = !this.state.selectAll;
            return item;
        });

        this.setState({ checkItems: newItems, selectAll: !this.state.selectAll, preserveScroll: true });
    }
    onWindowClick(event) {
        if (this.props.multiselect && this.props.controlled) {
            return;
        }

        const dropdownElement = findDOMNode(this);

        if (event.target !== dropdownElement && !dropdownElement.contains(event.target) && this.isActive()) {
            this.hide();

            if (this.props.multiselect && this.props.onChange) {
                this.props.onChange(this.state.checkItems);
            }
        }
    }
    onToggleClick() {
        if (this.isActive()) {
            if (!this.props.multiselect) {
                this.hide();
            }

            return;
        }

        if (this.props.multiselect && this.props.controlled) {
            this.setState({
                active: true,
                checkItemsSnapshot: _.cloneDeep(this.state.checkItems)
            });
        } else {
            this.show();
        }
    }
    handleOkClick() {
        this.hide();
        if (this.props.onChange) {
            this.props.onChange(this.state.checkItems);
        }        
    }
    handleCancelClick() {
        this.setState({
            active: false,
            preserveScroll: false,
            checkItems: _.cloneDeep(this.state.checkItemsSnapshot)
        });

        if (this.props.onChange) {
            this.props.onChange(this.state.checkItemsSnapshot);
        }
    }
}

Dropdown.propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool,
    onChange: PropTypes.func,
    optionItems: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        selected: PropTypes.bool
    })).isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    search: PropTypes.bool,
    controlled: PropTypes.bool,
    multiselect: PropTypes.bool
};
