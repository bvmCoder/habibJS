import * as React from 'react';
class Content extends React.Component {
    constructor() {
        super();
    }
    static getName() {
        return 'content';
    }
    
    render() {
        return (<div>
                {this.props.children}
            </div>);
    }
    
}
Content.propTypes = {
    children: React.PropTypes.any
};
export default Content;
