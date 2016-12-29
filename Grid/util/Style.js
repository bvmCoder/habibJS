// import * as React from 'react';
const React = require("react");
const { Component } = React;
import { Constants } from './constants';
export default class Style extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const gutter = this.props.gutter / 2;
        const style = `
      .${Constants.ROW}:after, .${Constants.COL}:after{content:'';display:block;height:0;visibility:hidden;clear:both;}
      .${Constants.ROW}{margin-left:auto;margin-right:auto;width:100%;}
      .${Constants.COL}{box-sizing:border-box;-ms-box-sizing:border-box;-moz-box-sizing:border-box;width:100%;max-width:100%;float:left;min-height:1px;}
      .${Constants.COL}{padding-left:${gutter}px;padding-right:${gutter}px;}
      .${Constants.COL} .${Constants.ROW}{margin-left:-${gutter}px;margin-right:-${gutter}px;width:auto;}
    `;
        return <style dangerouslySetInnerHTML={{ __html: style }}/>;
    }
}
