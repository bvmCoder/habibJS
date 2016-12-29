import * as React from 'react';
import Info from './Info';
import * as _ from 'lodash';
const styles = require('./style.less');

export default class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.handlePageSelect = this.handlePageSelect.bind(this);
    }
    pageGenerate() { // eslint-disable-line max-statements
        const maxBtnCount = this.props.maxButtonCount;
        const pageSize = this.props.pageSize;
        const lastPage = Math.ceil(this.props.totalCount / pageSize);
        const items = [];
        if (lastPage <= maxBtnCount) {
            for (let i = 1; i <= lastPage; i++) {
                items.push({ pageNum: i });
            }
        } else {
            const middleNum = (maxBtnCount - 5) / 2;
            const left = this.props.currentIndex - middleNum + 1;
            const right = this.props.currentIndex + middleNum + 1;
            if (left > 3 && right < lastPage - 2) {
                items.push({ pageNum: 1 });
                items.push({ pageNum: -2 });
                for (let i = left; i <= right; i++) {
                    items.push({ pageNum: i });
                }
                items.push({ pageNum: -1 });
                items.push({ pageNum: lastPage });
            } else if (left <= 3) {
                for (let i = 1; i < maxBtnCount - 1; i++) {
                    items.push({ pageNum: i });
                }
                items.push({ pageNum: -1 });
                items.push({ pageNum: lastPage });
            } else {
                items.push({ pageNum: 1 });
                items.push({ pageNum: -2 });
                for (let i = lastPage - (maxBtnCount - 3); i <= lastPage; i++) {
                    items.push({ pageNum: i });
                }
            }
        }
        return items;
    }
    handlePageSelect(event) {
        const pageNum = _.toNumber(event.currentTarget.id);
        if (this.props.onPageSelect) {
            this.props.onPageSelect(pageNum);
        }
    }
    render() {
        return (<div className={styles.pager}>
                <ul>
                    <li>
                        <Info labels={this.props.labels}/>
                    </li>
                    <li>
                        {this.props.todos}
                    </li>
                    <li>               
                        {this.pageGenerate().map((item) => {
                            if (item.pageNum < 0) {
                                return <span key={item.pageNum} className={styles.omit}>...</span>;
                            } else {
                                return <a key={item.pageNum} className={this.props.currentIndex === item.pageNum - 1 ? styles.active : ' '} id={item.pageNum} onClick={this.handlePageSelect}> {item.pageNum} </a>;
                            }
                        })}
                    </li>
                </ul>

            </div>);
    }
}

Pager.propTypes = {
    currentIndex: React.PropTypes.number,
    labels: React.PropTypes.array,
    maxButtonCount: React.PropTypes.number,
    onPageSelect: React.PropTypes.func,
    pageSize: React.PropTypes.number,
    todos: React.PropTypes.any,
    totalCount: React.PropTypes.number.isRequired
};

Pager.defaultProps = {
    currentIndex: 0,
    labels: [],
    maxButtonCount: 7,
    onPageSelect() { },
    pageSize: 50,
    todos: null
};
