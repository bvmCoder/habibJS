import { Component, PropTypes } from 'react';
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from 'react-dom'; // eslint-disable-line camelcase
// heavily inspired by https://github.com/callemall/material-ui/blob/master/src/internal/RenderToLayer.js
// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
export default class RenderToBody extends Component {
    render() {
        return null;
    }
    componentDidMount() {
        this.renderLayer();
    }
    componentDidUpdate() {
        this.renderLayer();
    }
    componentWillUnmount() {
        this.unRenderLayer();
    }
    unRenderLayer() {
        if (!this.layer) {
            return;
        }
        unmountComponentAtNode(this.layer);
        document.body.removeChild(this.layer);
        this.layer = null;
    }
    /*
    * By calling this method in componentDidMount() and
    * componentDidUpdate(), you're effectively creating a "wormhole" that
    * funnels React's hierarchical updates through to a DOM node on an
    * entirely different part of the page.
    */
    renderLayer() {
        const { render } = this.props;
        if (!this.layer) {
            this.layer = document.createElement('div');
            document.body.appendChild(this.layer);
        }
        const layerElement = render();
        if (layerElement) {
            this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
        } else {
            this.unRenderLayer();
        }
    }
}

RenderToBody.propTypes = {
    render: PropTypes.func.isRequired
};
