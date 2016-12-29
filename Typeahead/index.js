import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
import * as _ from 'lodash';
import Button from '../Button/index';
const styles = require('./style.less');

export default class Typeahead extends React.Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
        this._keyCodes = { ArrowDown: 40, ArrowUp: 38, Enter: 13 };
        this.resetPager();
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onResultItemKeyDown = this.onResultItemKeyDown.bind(this);
        this.onResultSelected = this.onResultSelected.bind(this);
        this.onResultItemCheck = this.onResultItemCheck.bind(this);
        this.onMultiselectAddClick = this.onMultiselectAddClick.bind(this);
        this.state = { searchResults: [], selectedResults: [] };
        this._resultSelected = false;
    }
    componentDidUpdate() {
        if (this._resultList) {
            this._resultList.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }
    render() {
        const className = setCssModule('typeahead', this.props.className);
        const inputClassName = setCssModule('input-box');
        return (<div className={styles[className]}>
                <div className={styles['input-section']}>
                    <input placeholder={this.props.placeholder} className={styles[inputClassName]} 
                        ref={(c) => {this._searchInput = c; } } //eslint-disable-line react/jsx-no-bind
                        onChange={this.onTextChanged} onKeyDown={this.onKeyDown}
                    />
                </div>
                {this.getResults()}
            </div>);
    }
    onMultiselectAddClick() {
        if (this.props.onSelected) {
            const selectedResultHtml = this.props.onSelected(this.state.selectedResults) || '';
            this._searchInput.value = selectedResultHtml;
        }
        this.setState({ searchResults: [], selectedResults: [] });
        this._resultSelected = true;
    }
    onResultItemCheck(event) {
        const target = event.currentTarget;
        const item = this.state.searchResults[target.id];
        const selectedItems = this.state.selectedResults;
        if (target.checked) {
            selectedItems.push(item);
        } else {
            const propertyNames = Object.getOwnPropertyNames(item);
            _.remove(selectedItems, (si) => {
                let match = true;
                propertyNames.forEach((pName) => {
                    match = match && si[pName] === item[pName];
                });
                return match;
            });
        }
        this.setState({ selectedResults: selectedItems });
    }
    onKeyDown(event) {
        if (!event) {
            return;
        }
        if (event.keyCode === this._keyCodes.ArrowDown && this._firstResultItem) {
            this._firstResultItem.focus();
        }
    }
    onResultSelected(event) {
        if (event) {
            this.resultSelected(event);
        }
    }
    onResultItemKeyDown(event) {
        if (!event) {
            return;
        }
        if (event.keyCode === this._keyCodes.Enter) {
            this.resultSelected(event);
        }
        if (event.keyCode === this._keyCodes.ArrowUp && event.currentTarget.previousSibling) {
            event.currentTarget.previousSibling.focus();
        }
        if (event.keyCode === this._keyCodes.ArrowDown && event.currentTarget.nextSibling) {
            event.currentTarget.nextSibling.focus();
        }
    }
    resultSelected(event) {
        const $selectedResult = this.state.searchResults[event.currentTarget.tabIndex];
        const $selectedResultHtml = this.props.onSelected ? this.props.onSelected($selectedResult) : null;
        this._searchInput.value = (($selectedResultHtml ? $selectedResultHtml : $selectedResult) || '').replace(/(<([^>]+)>)/ig, '');
        this.setCurrentState([]);
        this._resultSelected = true;
    }
    onTextChanged(event) {
        this._resultSelected = false;
        if (!event) {
            return;
        }
        this.resetPager();
        const $searchText = event.currentTarget.value;
        if (this._timer) {
            clearTimeout(this._timer);
        }
        this._timer = setTimeout(() => this.executeSearch($searchText, this.searchCompleted.bind(this)), this.props.delay);
    }
    searchCompleted(results) {
        this.setCurrentState(results);
    }
    executeSearch(searchText, callbackFunction) {
        if (this._resultSelected) {
            return;
        }
        const $searchText = (searchText ? searchText : '' || '').trim();
        if ($searchText.length < this.props.charCount) {
            this.setCurrentState([]);
            this.setState({ selectedResults: [] });
            return;
        }
        if (this.props.onSearch) {
            this.props.onSearch(searchText, this._pager, callbackFunction);
        } else {
            callbackFunction(this.localSearch(searchText));
        }
    }
    localSearch(/*searchText*/) {
        let $results = [];
        const $searchText = (this._searchInput ? this._searchInput.value : '' || '').trim().toLowerCase();
        const $options = this.props.options ? (Array.isArray(this.props.options) ? this.props.options : [this.props.options]) : []; // eslint-disable-line no-nested-ternary
        $results = $options.filter((option) => {
            return option.toLowerCase().trim().search($searchText) > -1;
        });
        if (this._pager) {
            $results = $results.slice((this._pager.pageSize * (this._pager.pageNumber - 1)), this._pager.pageSize * this._pager.pageNumber);
        }
        return $results;
    }
    getResultItem(result, index) {
        if (index === 0) {
            return (<li key={index} onClick={this.onResultSelected} onKeyDown={this.onResultItemKeyDown} 
                ref={(c) => { //eslint-disable-line react/jsx-no-bind
                    this._firstResultItem = c; 
                }} tabIndex={index}
                    >
                        {this.getResult(result)}
                    </li>);
        } else {
            return (<li key={index} onClick={this.onResultSelected} onKeyDown={this.onResultItemKeyDown} tabIndex={index}>
                    {this.getResult(result)}
                </li>);
        }
    }
    getMultiselectResultItem(result, index) {
        if (index === 0) {
            return (<li key={index} onKeyDown={this.onResultItemKeyDown} 
                ref={(c) => { //eslint-disable-line react/jsx-no-bind
                    this._firstResultItem = c;
                } } tabIndex={index}
                    >
                    <span className={styles['multiselect-checkbox']}><input type='checkbox' id={_.toString(index)} onChange={this.onResultItemCheck}/></span>
                    {this.getResult(result)}
                </li>);
        } else {
            return (<li key={index} onKeyDown={this.onResultItemKeyDown} tabIndex={index}>
                    <span className={styles['multiselect-checkbox']}><input type='checkbox' id={_.toString(index)} onChange={this.onResultItemCheck}/></span>
                    {this.getResult(result)}
                </li>);
        }
    }
    getResults() {
        const $options = this.state.searchResults;
        if ($options.length > 0) {
            const $searchResults = $options.map((result, index) => {
                return this.props.multiSelect ? this.getMultiselectResultItem(result, index) :
                    this.getResultItem(result, index);
            });
            const uiStyles = { maxHeight: String(this.props.listHeight) + 'px' };
            const listClassName = setCssModule('result-set');
            return (<div className={styles['result-section']}>
                    <ul className={styles[listClassName]} style={uiStyles} 
                        ref={(c) => { //eslint-disable-line react/jsx-no-bind
                            this._resultList = c;
                        }} tabIndex={$options.length + 1}
                    >
                      {$searchResults}
                    </ul>
                    {this.getMultiselectFooter()}
                </div>);
        } else {
            return null;
        }
    }
    getStringAsHtml(result) {
        return { __html: result };
    }
    getResult(result) {
        let $result = result;
        if (this.props.onRender) {
            $result = this.props.onRender(result);
        }
        if (typeof $result === 'string') {
            return (<span dangerouslySetInnerHTML={this.getStringAsHtml($result)} />);
        } else {
            return (<span>{$result}</span>);
        }
    }
    handleScroll() {
        if (this._pager) {
            if (this._resultList.clientHeight + this._resultList.scrollTop >= this._resultList.scrollHeight) {
                this._pager.pageNumber++;
                this.executeSearch(this._searchInput.value, this.searchOnScrollCompleted.bind(this));
            }
        }
    }
    getMultiselectFooter() {
        if (this.props.multiSelect && this.state.selectedResults.length > 0) {
            return (<div className={styles['multiselect-footer']}>
                    <Button className={styles['multiselect-add-button']} size='small' onClick={this.onMultiselectAddClick}>{this.props.multiSelectButtonText}</Button>
               </div>);
        } else {
            return null;
        }
    }
    searchOnScrollCompleted(results) {
        if (results) {
            this.setCurrentState(this.state.searchResults.concat(results));
        }
    }
    setCurrentState(searchResults) {
        let $results = [];
        if (searchResults) {
            $results = Array.isArray(searchResults) ? searchResults : [searchResults];
        }
        this.setState({ searchResults: $results });
    }
    resetPager() {
        this._pager = this.props.pageSize > 0 ? { pageNumber: 1, pageSize: this.props.pageSize } : null;
    }
}

Typeahead.propTypes = {
    charCount: React.PropTypes.number,
    className: React.PropTypes.string,
    delay: React.PropTypes.number,
    listHeight: React.PropTypes.number,
    multiSelect: React.PropTypes.bool,
    multiSelectButtonText: React.PropTypes.string,
    onRender: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    options: React.PropTypes.array,
    pageSize: React.PropTypes.number,
    placeholder: React.PropTypes.string
};

Typeahead.defaultProps = {
    charCount: 1,
    delay: 250,
    listHeight: 250,
    multiSelect: false,
    multiSelectButtonText: 'ADD',
    pageSize: 0,
    placeholder: 'Search'
};
