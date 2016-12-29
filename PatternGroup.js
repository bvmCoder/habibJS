import * as React from 'react';
const style = require('./style.less');
class SubLink extends React.Component {
    render() {
        const elemProps = {};
        if (this.props.className) {
            elemProps.className = this.props.className;
        }
        return (<div {...elemProps}>
        <a href={`#${this.props.section.replace(' ', '_')}`}>{this.props.section}</a>
      </div>);
    }
}
export class PatternGroup extends React.Component {
    render() {
        const grpId = this.props.tag === undefined ? this.props.name.replace(' ', '_') : this.props.tag;
        const propsLink = React.Children.map(this.props.children, (el, indx) => {
            if (el.type.name === 'Props') {
                return <SubLink className={style.patternGroupNavPropsLink} key={`item-${indx}`} section='Props'/>;
            } else {
                return null;
            }
        });
        const links = React.Children.map(this.props.children, (el, indx) => {
            if (el.type.name === 'Pattern') {
                return <SubLink key={`item-${indx}`} section={el.props.name}/>;
            } else {
                return null;
            }
        });
        return (<div className={style.patternGroup} id={grpId}>
          <div className={style.patternGroupTitle}>{'<' + this.props.name + '>'}</div>
          <div className={style.patternGroupNav}>
            {[[propsLink[0]], links]}
          </div>
          <div className={style.patternGroupContent}>
            {this.props.children}
          </div>
        </div>);
    }
}
