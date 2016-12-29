import * as React from 'react';
import './style.css';

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.spinner = null;
        this.style = {
            label: {
                color: 'rgb(205,156,84)',
                fontSize: '11px',
                fontWeight: '300',
                marginTop: '3px',
                textAlign: 'center',
                textTransform: 'uppercase'
            },
            spinnerContainer: {
                WebkitAnimation: 'spin infinite linear',
                WebkitAnimationDuration: '1s',
                animation: 'spin infinite linear',
                animationDuration: '1s',
                height: '50px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50px'
            }
        };
        this.draw = this.draw.bind(this);
        this.setSpinner = this.setSpinner.bind(this);
    }
    componentWillMount() {
        if (this.props.size) {
            this.style.spinnerContainer.height = this.props.size + 'px';
            this.style.spinnerContainer.width = this.props.size + 'px';
        }
        if (this.props.speed) {
            this.style.spinnerContainer.WebkitAnimationDuration = this.props.speed + 's';
            this.style.spinnerContainer.animationDuration = this.props.speed + 's';
        }
        if (this.props.color) {
            this.style.label.color = this.props.color;
        }
    }
    componentDidMount() {
        this.draw(this.props.size / 2 || 25, this.props.color || 'rgb(205,156,84)', this.props.lineWidth || 1);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.size !== this.props.size || nextProps.color !== this.props.color) {
            this.style.spinnerContainer.height = nextProps.size + 'px';
            this.style.spinnerContainer.width = nextProps.size + 'px';
            this.style.label.color = nextProps.color;
            return true;
        }
        if (nextProps.speed !== this.props.speed) {
            this.style.spinnerContainer.WebkitAnimationDuration = nextProps.speed + 's';
            this.style.spinnerContainer.animationDuration = nextProps.speed + 's';
            return true;
        }

        return false;
    }
    componentDidUpdate(nextProps) {
        this.draw(nextProps.size / 2 || 25, nextProps.color || 'rgb(205,156,84)', nextProps.lineWidth || 1);
    }
    draw(size, color, lineWidth) { // eslint-disable-line max-statements
        // color: rgb(255,255,255)
        const colorPerfix = color.replace('rgb', 'rgba').replace(')', '');
        const canvas = this.spinner;
        const ctx = canvas.getContext('2d');
        let trans = 1;
        for (let i = 0; i < 20; i++) {
            const record = Math.PI / 10;
            const step = 1 / 40;
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.arc(size, size, size - 2, i * record, (i + 1) * record, false);
            const gradent = ctx.createLinearGradient(0, 0, 100, 100);
            gradent.addColorStop(0, `${colorPerfix},${trans})`);
            trans -= step;
            gradent.addColorStop(1, `${colorPerfix},${trans})`);
            trans -= step;
            ctx.strokeStyle = gradent;
            ctx.stroke();
        }
    }
    setSpinner(cv) {
        this.spinner = cv;
    }
    render() {
        return (<div style={this.props.style} className={this.props.className}>
                <div style={this.style.spinnerContainer}>
                <canvas ref={ this.setSpinner } />
                </div>
                <p style={this.props.fontStyle
            ? Object.assign({}, this.style.label, this.props.fontStyle)
            : this.style.label} >
                    {this.props.children || 'loading'}
                </p>
            </div>);
    }
}
