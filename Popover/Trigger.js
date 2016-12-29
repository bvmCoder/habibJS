import * as React from 'react';
class Trigger extends React.Component {
    constructor() {
        super();
    }
    static getName() {
        return 'trigger';
    }
    
    render() {
        return (<div>
                {this.props.children}
            </div>);
    }
    
}
Trigger.propTypes = {
    children: React.PropTypes.any
};
export default Trigger;
