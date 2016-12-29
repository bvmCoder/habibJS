const React = require("react");
const { PropTypes, Component } = React;
import { findDOMNode } from 'react-dom';
import { setCssModule } from 'mdc-classnames';
import Label from '../Label/index';
const styles = require('./style.less');
const _ = require('lodash');
const cx = setCssModule.bind(styles);
export default class DropdownList extends Component {
    constructor(props) {
        super(props);
        this.selectItem = (e, item) => {
            this.setState({ selectedItem: item });
            this.setState({ active: false });
            this.props.onChange(item.value, this.props.optionItems);
        };
        this.selectItem = this.selectItem.bind(this);
        this._onWindowClick = this._onWindowClick.bind(this);
        this._onToggleClick = this._onToggleClick.bind(this);
        this.state = {
            active: false,
            selectedItem: (this.props.optionItems.filter((item) => item.selected)
                && this.props.optionItems.filter((item) => item.selected)[0])
                || this.props.optionItems[0],
            showWidth: '100%'
        };
    }

    toEllipse() {
        const refs = this.refs;
        const list = refs.itemList.children[0].children;
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
    _adjustHeight(list) {
        let height = 0;
        for (let i = 0; i < 5 && i < list.length; i++) {
            height += list[i].offsetHeight;
        }
        return height + 2;
    }
    componentDidMount() {
        window.addEventListener('click', this._onWindowClick);
        this.toEllipse();
        // const doc = document;
        const refs = this.refs;
        refs.itemList.style.maxHeight = `${this._adjustHeight(refs.itemList.children[0].children)}px`;
        const showWidth = refs.showInput.offsetWidth;
        this.setState({ showWidth: `${100 - 15 * 100 / showWidth}%` });
    }
    componentDidUpdate() {
        const refs = this.refs;
        refs.itemList.style.maxHeight = `${this._adjustHeight(refs.itemList.children[0].children)}px`;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.optionItems && this.props.optionItems !== nextProps.optionItems) {
            this.state = {
                selectedItem: (nextProps.optionItems.filter((item) => item.selected)
                    && nextProps.optionItems.filter((item) => item.selected)[0])
                    || nextProps.optionItems[0]
            };
        }
    }
    componentWillUnmount() {
        window.removeEventListener('click', this._onWindowClick);
    }
    render() {
        const style = {
            visibility: this.state.active ? 'visible' : 'hidden'
        };
        const customWidth = {};
        const width = this.props.width;
        if (width) {
            style.minWidth = width;
            customWidth.minWidth = width;
            customWidth.width = width;
            if (width >= 285) {
                style.maxWidth = width;
            } else {
                style.maxWidth = 285;
            }
        } else {
            style.maxWidth = 285;
        }
        return (
            <div className={cx(styles.container)} onClick={this._onToggleClick}>
                <ul className={styles.dropdown}>
                    <li className={cx(styles.defaultItem)} style={customWidth}>
                        <ul>
                            <li className={styles.pull_left} title={this.state.selectedItem.text} style={{ width: this.state.showWidth }} ref='showInput'><Label className='Body-Secondary'>{this.state.selectedItem.text}</Label></li>
                            <li className={styles.pull_right}>
                                <span className={this.state.active ? styles.icon_up_arrow : styles.icon_down_arrow} />
                            </li>
                        </ul>
                    </li>
                    <li className={styles.itemList} style={style} ref='itemList'>
                        <ul>
                            {this.props.optionItems.map((item) => {
                                return <li className={styles.item} onClick={(e) => this.selectItem(e, item)} key={item.value} title={item.text}><Label className='Body-Secondary'>{item.text}</Label></li>;
                            })}
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
    isActive() {
        return (typeof this.props.active === 'boolean') ? this.props.active : this.state.active;
    }
    hide() {
        this.setState({
            active: false
        });
        /*
        if (this.props.onHide ){
            this.props.onHide();
        }*/
    }
    show() {
        this.setState({
            active: true
        });
        /*
        if(this.props.onShow){
            this.props.onShow();
        }
        */
    }
    _onWindowClick(event) {
        const dropdownElement = findDOMNode(this);
       
        if (event.target !== dropdownElement && !dropdownElement.contains(event.target) && this.isActive()) {
            this.hide();
        }
    }
    _onToggleClick(event) {
        event.preventDefault();
        // event.stopPropagation();
        if (this.isActive()) {
            this.hide();
        } else {
            this.show();
        }
    }
}
DropdownList.propTypes = {
    active: PropTypes.bool,
    onChange: PropTypes.func,
    optionItems: PropTypes.array,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
