const React = require("react");
const { /*PropTypes,*/ Component } = React;
import SelectedItem from './SelectedItem';


export default class OptionItem extends Component {
    render() {
        // const selecteds = this.props.selecteds;
        const self = this;
        const showOptionListNodes = this.props.selectedOptionList.map(function (item) {
            return (
                <SelectedItem key={item.value} selectedOption={item} handleDelClick={self.handleDelClick.bind(self)}/>
            );
        });
        return (
            <div>
                <ul>
                    {showOptionListNodes}
                </ul>
            </div>
        );
    }
    handleDelClick(item) {
        this.props.handleDelClick(item);
    }
}
