const React = require("react");
const { PropTypes, Component } = React;
import { setCssModule } from 'mdc-classnames';
import Button from './../Button';
import SearchInput from './SearchInput';
import OptionList from './OptionList';
import SelectedOptionList from './SelectedOptionList';
import * as _ from 'lodash';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class MultiDropdown extends Component {
    constructor(props) {
        super(props);
        this.onOkClick = this.onOkClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.state = {
            allSelected: _.isEqual(this.getSelectedList(props.optionsItems, props.selectedOptions), props.optionsItems),
            includeButtons: props.includeButtons,
            initialSelectedOptions: props.selectedOptions ? _.cloneDeep(props.selectedOptions) : [],
            isListDisplay: false,
            optionsItems: props.optionsItems,
            searchText: '',
            selectedOptions: props.selectedOptions ? props.selectedOptions : []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            allSelected: _.isEqual(this.getSelectedList(this.props.optionsItems, nextProps.selectedOptions), this.props.optionsItems),
            initialSelectedOptions: _.cloneDeep(nextProps.selectedOptions),
            selectedOptions: nextProps.selectedOptions
        });
    }
    render() {
        const selectedOptions = this.state.selectedOptions || [];
        const searchBlock = cx(this.props.className, {
            displayCss: this.state.isListDisplay,
            divSearchBlock: true
        });
        const titleDisplayClass = cx('', {
            borderBottom: !this.state.isListDisplay,
            displayInlineCss: !this.state.isListDisplay || this.props.dropdownType !== 1,
            divTitle: true
        });
        const selNumsShow = this.props.hideTitle === true ?
            cx('', {
                displayInlineCss: true,
                selNumShow: true
            }) :
            cx('', {
                displayInlineCss: selectedOptions.length > 0 && this.props.dropdownType !== 1,
                selNumShow: true
            });
        const selectDisplayClass = cx('', {
            displayCss: this.props.dropdownType === 1,
            selectedBlock: true
        });
        let selectedCount;
        if (selectedOptions.length > 0) {
            selectedCount = (selectedOptions.length === this.props.optionsItems.length) ?
                "All" : `${selectedOptions.length} Selected`;
        } else {
            selectedCount = "None";
        }
        // hideTitle => select all items
        // if (this.props.hideTitle === true) {this.addSelectAllOption(); }
        const buttonContainerClass = cx('', 'buttonContainer');
        // const okbuttonClass = cx('', 'okbutton');
        // const cancelbuttonClass = cx('', 'cancelbutton');
        // disabled OK Button if none option is selected
        const disabledButton = this.state.selectedOptions.length > 0 ? false : true;
        const buttons = this.props.includeButtons ?
            <div className={buttonContainerClass}>
              <Button onClick={this.onCancelClick}>CANCEL</Button>
              <Button primary disabled={disabledButton} onClick={this.onOkClick}>OK</Button>
            </div> : '';
        const titleBlock = (this.props.hideTitle === true) ?
            <div>
                <span className={selNumsShow}>{`${selectedCount}`}</span>
                <i className={styles.iconExpand} />
            </div>
            :
            <div>
                <span>{this.props.dropdownTitle}</span>
                <span className={selNumsShow}>{`${selectedOptions.length} Selected`}</span>
                <i className={styles.iconExpand} />
            </div>;
        const result = this.props.hideSearch ?
            <div className={styles.multiDropdown} onMouseLeave={this.handleExpandMouseLeave.bind(this)}>
                <div className={titleDisplayClass} onClick={this.handleExpandClick.bind(this)}>
                   {titleBlock}
                </div>
                <div className={searchBlock}>
                   <OptionList showOptionList={this.filterOptionList()} selectAll={this.selectAll.bind(this)} allSelected={this.state.allSelected} selecteds={selectedOptions} handleSelectClick={this.handleSelectClick.bind(this)}/>
                {buttons}
                </div>

                <div className={selectDisplayClass}>
                    <SelectedOptionList selectedOptionList={this.selectedOptionList()} handleDelClick={this.handleDelClick.bind(this)}/>
                </div>
            </div>
            :
                <div className={styles.multiDropdown} onMouseLeave={this.handleExpandMouseLeave.bind(this)}>
                <div className={titleDisplayClass} onClick={this.handleExpandClick.bind(this)}>
                    <span>{this.props.dropdownTitle}</span>
                    <span className={selNumsShow}>{ ` ${selectedOptions.length} Selected`}</span>
                    <i className={styles.iconExpand} />
                </div>
                <div className={searchBlock}>
                    <SearchInput placeholder={this.props.dropdownTitle} handleSearchChange={this.handleSearchChange.bind(this)}/>
                    <OptionList showOptionList={this.filterOptionList()} selecteds={selectedOptions} handleSelectClick={this.handleSelectClick.bind(this)}/>
                    {buttons}
                </div>
                <div className={selectDisplayClass}>
                    <SelectedOptionList selectedOptionList={this.selectedOptionList()} handleDelClick={this.handleDelClick.bind(this)}/>
                </div>
            </div>;
        return result;
    }
    initiateAll() {
        const selectedOptions = [];
        this.props.optionsItems.map(function (item) {
            selectedOptions.push(item.text);
        });
        return selectedOptions;
    }
    selectAll() {
        let selectedOptions = [];
        if (this.state.selectedOptions && this.state.allSelected) {
            selectedOptions = [];
            this.setState({ allSelected: false, selectedOptions });
        } else {
            this.props.optionsItems.map((item) => selectedOptions.push(item.text));
            this.setState({ allSelected: true, selectedOptions });
        }
    }
    handleDelClick(item) {
        console.log('del');
        const selectedOptions = this.state.selectedOptions;
        const index = selectedOptions.indexOf(item.text);
        selectedOptions.splice(index, 1);
        this.setState({ selectedOptions });
    }
    selectedOptionList() {
        // const self = this;
        const selectedOptions = this.state.selectedOptions;
        const selectedList = this.props.optionsItems.filter(function (item) {
            return (selectedOptions && selectedOptions.indexOf(item.text) !== -1) ? true : false;
        });
        this.props.uploadTheSelected(selectedList);
        return selectedList;
    }
    filterOptionList() {
        // const self = this;
        const searchText = this.state.searchText;
        const optionsItems = this.props.optionsItems.filter(function (item) {
            if (searchText === '' || item.text.indexOf(searchText) !== -1) {
                return true;
            }
            return false;
        });
        return optionsItems;
    }
    handleSelectClick(item) {
        const selectedOptions = this.state.selectedOptions;
        const index = selectedOptions.indexOf(item.text);
        if (index === -1) {
            selectedOptions.push(item.text);
        } else {
            selectedOptions.splice(index, 1);
        }
        const allSelected = this.state.selectedOptions.length === this.props.optionsItems.length;
        this.setState({ allSelected, selectedOptions });
    }
    handleSearchChange(searchText) {
        this.setState({ searchText });
    }
    handleExpandClick() {
        this.setState({ isListDisplay: true });
    }
    getSelectedList(optionItems, selectedItems) {
        const selectedList = optionItems.filter(function (item) {
            if (selectedItems.indexOf(item.text) !== -1) {
                return true;
            } else {
                return false;
            }
        });
        return selectedList;
    }
    handleExpandMouseLeave() {
        if (this.state.includeButtons) {
            return;
        }
        this.setState({ isListDisplay: false });
        if (this.props.mouseLeave) {
            const selectedOptions = this.state.selectedOptions;
            const selectedList = this.props.optionsItems.filter(function (item) {
                if (selectedOptions.indexOf(item.text) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });
            this.props.mouseLeave(selectedList);
        }
    }
    onOkClick() {
        this.setState({ isListDisplay: false });
        if (this.props.onOkClick) {
            const selectedOptions = this.state.selectedOptions;
            const selectedList = this.props.optionsItems.filter(function (item) {
                if (selectedOptions.indexOf(item.text) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });
            this.props.onOkClick(selectedList);
        }
    }
    onCancelClick() {
        this.setState({ isListDisplay: false, selectedOptions: this.state.initialSelectedOptions });
        if (this.props.onCancelClick) {
            const selectedOptions = this.state.initialSelectedOptions;
            const selectedList = this.props.optionsItems.filter(function (item) {
                if (selectedOptions.indexOf(item.text) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });
            this.props.onCancelClick(selectedList);
        }
    }
}

const { string, number, bool, any, func } = PropTypes;
MultiDropdown.propTypes = {
    className: string,
    dropdownTitle: string,
    dropdownType: number,
    hideSearch: bool,
    hideTitle: bool,
    includeButtons: bool,
    mouseLeave: any,
    optionsItems: any.isRequired,
    removeUnchecked: bool,
    selectedOptions: any,
    uploadTheSelected: func.isRequired
};
