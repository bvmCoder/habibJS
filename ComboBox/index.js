import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
import TextBox from '../TextBox';
const styles = require('./style.less');

export default class ComboBox extends React.Component {
    constructor(props, defaultProps) {
        super(props, defaultProps);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = { update: false };
    }
    componentWillReceiveProps() {
        this.setState({ update: !this.state.update });
    }
    render() {
        const classes = setCssModule('filter-dropdown', this.props.className);
        return (<div className={styles[classes]} onMouseLeave={this.handleMouseLeave}>
                <div className={styles['search-container']}>
                    <div className={styles['search-box-container']}>
                        <TextBox placeholder={this.props.placeholder} value={this.props.searchText} onChange={this.handleTextChange} disabled={this.props.disableSearch}/></div>
                    <div className={styles['icon-container']} onClick={this.handleIconClick}></div>
                </div>
                <div className={styles[this.props.showContent ? 'content-visible' : 'content-hidden']}>
                    {this.props.children}
                </div>
            </div>);
    }
    handleMouseLeave(e) {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }
    handleIconClick(e) {
        if (this.props.onCollapseExpandClick) {
            this.props.onCollapseExpandClick(e);
        }
    }
    handleTextChange(e) {
        if (this.props.onSearchTextChange) {
            this.props.onSearchTextChange(e);
        }
    }
}

ComboBox.propTypes = {
    className: React.PropTypes.string,
    disableSearch: React.PropTypes.bool,
    onCollapseExpandClick: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onSearchTextChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    searchText: React.PropTypes.string,
    showContent: React.PropTypes.bool
};

ComboBox.defaultProps = {
    disableSearch: false,
    placeholder: '',
    searchText: '',
    showContent: false
};
