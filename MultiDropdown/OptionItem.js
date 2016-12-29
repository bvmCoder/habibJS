const React = require("react");
const { /*PropTypes,*/ Component } = React;
// import { setCssModule } from 'mdc-classnames';
import CheckBox from './../CheckBox';
// const styles = require('./style.less');
// const cx = setCssModule.bind(styles);

export default class OptionItem extends Component {
    constructor(props) {
        super(props);
        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.state = {
            checked: props.selected
        };
    }
    handleSelectClick(value, state) {
        // event.preventDefault();
        console.log(state);
        this.setState({
            checked: value
        });
        this.props.handleSelectClick(this.props.option);
    }
    render() {
        const item = this.props.option;
        return (
            <li key={this.props.key} value={item.value}>
                <CheckBox text={item.text} onChange={this.handleSelectClick} checked={this.props.selected} />
            </li>
        );
    }
}
