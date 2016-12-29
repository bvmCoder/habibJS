import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { setCssModule } from 'mdc-classnames';
import Icon from '../Icon/index';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class AlertBanner extends React.Component {    
    constructor(props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.setRefNode = this.setRefNode.bind(this);
    }
    
    render() {
        const style = {
            transform: `translate(0, -50px)`,
            transition: `transform 500ms`
        };
        return (<div ref={this.setRefNode} className={cx('AlertBanner', this.props.className)} style={style}>
                    <div className={styles.middle}>
                        <div className={styles.content}>
                            {this.props.children}                            
                        </div>                        
                    </div>
                    <div className={styles.close}>
                        {this.props.closeable ?                        
                            <div onClick={this.handleCloseClick}>
                                <Icon icon="close"/>
                            </div>
                        :
                            <div>&nbsp;</div>
                        }     
                    </div>
                </div>);
    }
    setRefNode(node) {
        this.x = node;
    }
    componentDidMount() {
        const alertBanner = ReactDOM.findDOMNode(this.x);
        setTimeout(() => { 
            let _position = "fixed";
            let _height = "50px";
            if (this.props.inline) {
                _position = "relative";
                _height = "30px";
                alertBanner.style.marginBottom = "10px";
            } 
            alertBanner.style.transform = `translate(0, 0)`;
            alertBanner.style.visibility = `visible`;             
            alertBanner.style.height = _height;
            alertBanner.style.position = _position;            
        }, 100);
        if (this.props.autoclose) {
            this.timerCloseHandler = setTimeout(() => {            
                // Hide the AlertBanner
                alertBanner.style.visibility = `hidden`;                
                // Call the onClose Handler to notify the Parent
                const self = this;
                if (self.props.onClose) {
                    self.props.onClose();
                }  
            }, 10000);
        }
    }
    handleCloseClick() {        
        const alertBanner = ReactDOM.findDOMNode(this.x);        
        // Hide the AlertBanner
        alertBanner.style.visibility = `hidden`;            
        // Call the onClose Handler to notify the Parent
        const self = this;
        clearTimeout(this.timerCloseHandler);
        if (self.props.onClose) {
            self.props.onClose();
        }
    }
}
AlertBanner.propTypes = {
    children: React.PropTypes.element,
    onClose: React.PropTypes.func,        
    autoclose: React.PropTypes.bool,
    closeable: React.PropTypes.bool,
    inline: React.PropTypes.bool    
};

AlertBanner.defaultProps = {    
    autoclose: true,
    closeable: true,
    inline: false
};