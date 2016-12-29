import * as React from 'react';
import { setCssModule } from 'mdc-classnames';
import { htmlSubstring } from './util/htmlSubString';
import Popover from '../Popover/';
const styles = require('./style.less');
const cx = setCssModule.bind(styles);

export default class Label extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let label = this.renderLabel();
        if (this.props.tooltip) {
            let overlay = (<div className={cx('tooltip-overlay')}>
          <span className={cx('Body-Text-Prompt')}>{this.props.tooltip}</span>
        </div>);
            return (<Popover trigger='hover' toolTips={true} overlay={overlay} children={label} />); /* eslint react/jsx-boolean-value: 0 */
        } else {
            return label;
        }
    }
    renderLabel() { /* eslint complexity: 0 max-statements:0 */
        const elemProps = {};
        if (this.props.for) {
            elemProps.htmlFor = this.props.for;
        }
        const classNameArray = this.props.className ? this.props.className.split(' ') : [];
        if (this.props.color) {
            classNameArray.push(this.props.color);
        }
        if (this.props.type) {
            classNameArray.push(this.props.type);
        }
        let classes = cx(...classNameArray, {
            basicLabel: true,
            block: this.props.block,
            disabled: this.props.disabled
        });
        let tips = false;
        let showText = this.props.children;
        const maxlength = !isNaN(this.props.maxLength) ? parseInt(this.props.maxLength, 10) : -1;
        if (maxlength > 0 && showText.length > maxlength) {
            showText = htmlSubstring(showText, maxlength);
            tips = true;
        }
        if (tips) {
            elemProps.title = this.props.children;
        }
        if (this.props.title) {
            elemProps.title = this.props.children;
        }
        if (this.props.for) {
            return (<label className={classes} {...elemProps}>{showText}</label>);
        }
        if (this.props.block) {
            if (!this.props.html) {
                return (<div className={classes} {...elemProps}>{showText}</div>);
            }
            return (<div className={classes} {...elemProps} dangerouslySetInnerHTML={{ __html: showText }}></div>);
        } else {
            if (!this.props.html) {
                return (<span className={classes} {...elemProps}>{showText}</span>);
            }
            return (<span className={classes} {...elemProps} dangerouslySetInnerHTML={{ __html: showText }}></span>);
        }
    }
}

Label.propTypes = {
    block: React.PropTypes.bool,
    children: React.PropTypes.any.isRequired,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    for: React.PropTypes.string,
    html: React.PropTypes.bool,
    maxLength: React.PropTypes.string,
    tips: React.PropTypes.bool,
    title: React.PropTypes.any,
    tooltip: React.PropTypes.string,
    // truncateMode: React.PropTypes.oneOf(['right', 'left', 'middle', 'none']),
    type: React.PropTypes.oneOf(['Title-Page', 'Title-Page-Light', 'Title-Section-Primary', 'Title-Section-Primary-Light',
        'TITLE-SUBTITLE', 'Title-Section-Secondary', 'TITLE-MODULE', 'LABEL-STANDARD', 'LABEL-ATTRIBUTION', 'Label-Footnote',
        'Rating', 'Header-Primary', 'Body-Primary', 'Header-Secondary', 'Header-Secondary-Bold', 'Body-Secondary', 'Header-Tertiary',
        'Header-Tertiary-Bold', 'Body-Tertiary', 'Body-Tertiary-Med', 'Body-Text-Prompt', 'Link-DkBlue', 'LINK-GOLD', 'LINK-GREY',
        'LABEL-SIDENAV-TITLE', 'LABEL-STANDARD-SEMIBOLD'])
};
