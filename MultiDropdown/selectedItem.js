const React = require("react");
const { /*PropTypes,*/ Component } = React;

const styles = require('./style.less');

export default class OptionItem extends Component {
    constructor(props) {
        super(props);
        this.handleDelClick = this.handleDelClick.bind(this);
    }
    render() {
        return (
            <li>
                <span>{this.props.selectedOption.text}</span>
                <span className={styles.iconDel} onClick={this.handleDelClick}>X</span>
            </li>
        );
    }
    handleDelClick() {
        this.props.handleDelClick(this.props.selectedOption);
    }
}
