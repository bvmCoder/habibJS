import { Component } from 'react';
// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
    height: '50px',
    overflow: 'scroll',
    position: 'absolute',
    top: '-9999px',
    width: '50px'
};

let openCount = 0;
// heavily inspired by https://github.com/react-component/dialog/blob/master/src/Dialog.jsx
export default class ScrollbarEffect extends Component {
    render() {
        return null;
    }
    componentDidMount() {
        this.addScrollingEffect();
    }
    componentWillUnmount() {
        this.removeScrollingEffect();
    }
    setScrollbar() {
        if (this.bodyIsOverflow && this.scrollbarWidth) {
            document.body.style.paddingRight = `${this.scrollbarWidth}px`;
        }
    }
    addScrollingEffect() {
        openCount++;
        if (openCount !== 1) {
            return;
        }
        this.checkScrollbar();
        this.setScrollbar();
        document.body.style.overflow = 'hidden';
    }
    removeScrollingEffect() {
        openCount--;
        if (openCount !== 0) {
            return;
        }
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }
    checkScrollbar() {
        const fullWindowWidth = window.innerWidth;
        this.bodyIsOverflow = document.body.clientWidth < fullWindowWidth;
        if (this.bodyIsOverflow) {
            this.scrollbarWidth = this.measureScrollbar();
        }
    }
    measureScrollbar() {
        if (this.scrollbarWidth !== undefined) {
            return this.scrollbarWidth;
        }
        const scrollDiv = document.createElement('div');
        for (const scrollProp in scrollbarMeasure) {
            if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
                scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
            }
        }
        document.body.appendChild(scrollDiv);
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        this.scrollbarWidth = scrollbarWidth;
        return scrollbarWidth;
    }
}
