const React = require("react");
const { /*PropTypes,*/ Component } = React;
import OptionItem from './OptionItem';
const styles = require('./style.less');


export default class OptionList extends Component {
    constructor(props) {
        super(props);
        this.handleSelectClick = this.handleSelectClick.bind(this);
    }
    render() {
        const selecteds = this.props.selecteds;
        // const self = this;
        const showOptionListNodes = this.props.showOptionList.map((item) => {
            return (
                <OptionItem key={item.value} option={item} handleSelectClick={this.handleSelectClick} selected={selecteds.indexOf(item.text) !== -1}/>
            );
        });
        const showSelectAll = showOptionListNodes.length === 0 ? '' :
            <OptionItem key={'all'} option={{ text: 'All', value: 'All' }} handleSelectClick={this.props.selectAll} selected={this.props.allSelected}/>;
        return (<div className={styles.divSearchList}>
                <ul>
                    {showSelectAll}
                    {showOptionListNodes}
                </ul>
            </div>);
    }
    handleSelectClick(item) {
        this.props.handleSelectClick(item);
    }
}
