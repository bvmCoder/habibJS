import * as React from 'react';
import Color from '../Color';
import IconDictionary from './IconDictionary';

export default class Icon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const zoom = this.props.zoom.toString();
        let height = 16;
        let width = 16;
        const iconObj = IconDictionary[this.props.icon] && IconDictionary[this.props.icon]() || IconDictionary[this.props.name] && IconDictionary[this.props.name]();
        if (!iconObj) {
            console.error("ICON:", this.props.icon + " can't not find");
            return null;
        }
        if (!isNaN(parseFloat(zoom, 10))) {
            height = iconObj.height * parseFloat(zoom, 10);
            width = iconObj.width * parseFloat(zoom, 10);
        } else {
            height = iconObj.height;
            width = iconObj.width;
        }
        const styles = {
            color: Color[this.props.color],
            fill: 'currentcolor',
            height,
            verticalAlign: 'middle',
            width
        };
        const viewBox = iconObj ? iconObj.viewBox : '0 0 16 16';
        return (<svg viewBox={viewBox} preserveAspectRatio='xMidYMid meet' style={styles} dangerouslySetInnerHTML={{ __html: this.renderGraphic() }} />);
    }
    renderGraphic() {
        if (IconDictionary[this.props.icon] || IconDictionary[this.props.name]) {
            const getIcon = IconDictionary[this.props.icon] || IconDictionary[this.props.name];
            const svg = getIcon(Color[this.props.color]).svg;
            return svg;
        }
        return null;
    }
}

Icon.propTypes = {
    color: React.PropTypes.string,
    icon: React.PropTypes.string,
    name: React.PropTypes.string,
    zoom: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};

Icon.defaultProps = {
    zoom: 1
};
