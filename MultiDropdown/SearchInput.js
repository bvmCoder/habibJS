const React = require("react");
const { /*PropTypes,*/ Component } = React;
const styles = require('./style.less');

export default class SearchInput extends Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
    }
    render() {
        return (<div className={styles.divSearchInputBlock}>
                <div className={styles.divSearchInput}>
                    <input placeholder={'search for ' + this.props.placeholder} onChange={this.handleSearchChange.bind(this)}/>
                    <i className={styles.iconSearch} />
                </div>
            </div>);
    }
    handleSearchChange(e) {
        this.props.handleSearchChange(e.target.value);
    }
}
