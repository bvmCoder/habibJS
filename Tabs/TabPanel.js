import * as React from 'react';
export default class TabPanel extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}
TabPanel.propTypes = {
    children: React.PropTypes.any,
    disabled: React.PropTypes.string,
    title: React.PropTypes.string.isRequired
};
