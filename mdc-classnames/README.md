Classnames
===========

A simple javascript utility for conditionally joining classNames together.

Install with npm
```sh
npm install mdc-classnames --save
```

Use with node.js, browserify or webpack:

```js
import { classSet } from 'mdc-classnames';
classSet('foo', 'bar'); // => 'foo bar'
```

## Usage

The `classSet` function takes any number of arguments which can be a string or object.
The argument `'foo'` is short for `{ foo: true }`. If the value of the key is falsy, it won't be included in the output.

```js
classSet('foo', 'bar'); // => 'foo bar'
classSet('foo', { bar: true }); // => 'foo bar'
classSet({ 'foo-bar': true }); // => 'foo-bar'
classSet({ 'foo-bar': false }); // => ''
classSet({ foo: true }, { bar: true }); // => 'foo bar'
classSet({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classSet('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classSet(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

Arrays will be recursively flattened as per the rules above:

```js
var arr = ['b', { c: true, d: false }];
classSet('a', arr); // => 'a b c'
```

### Dynamic class names with ES2015

If you're in an environment that supports [computed keys](http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer) (available in ES2015 and Babel) you can use dynamic class names:

```js
let buttonType = 'primary';
classSet({ [`btn-${buttonType}`]: true });
```

### Usage with React.js

This package is the official replacement for `classSet`, which was originally shipped in the React.js Addons bundle.

One of its primary use cases is to make dynamic and conditional className props simpler to work with (especially more so than conditional string manipulation). So where you may have the following code to generate a `className` prop for a `<button>` in React:

```js
var Button = React.createClass({
  // ...
  render () {
    var btnClass = 'btn';
    if (this.state.isPressed) btnClass += ' btn-pressed';
    else if (this.state.isHovered) btnClass += ' btn-over';
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

You can express the conditional classes more simply as an object:

```js
import { classSet } from 'mdc-classnames';

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classSet({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

Because you can mix together object, array and string arguments, supporting optional className props is also simpler as only truthy arguments get included in the result:

```js
var btnClass = classSet('btn', this.props.className, {
  'btn-pressed': this.state.isPressed,
  'btn-over': !this.state.isPressed && this.state.isHovered
});
```


### Alternate `setCssModule` version (for [css-modules](https://github.com/css-modules/css-modules))

If you are using [css-modules](https://github.com/css-modules/css-modules), or a similar approach to abstract class "names" and the real `className` values that are actually output to the DOM, you may want to use the `bind` variant.

_Note that in ES2015 environments, it may be better to use the "dynamic class names" approach documented above._

```js
import { setCssModule } from 'mdc-classnames';

var styles = {
  foo: 'abc',
  bar: 'def',
  baz: 'xyz'
};

var cx = setCssModule.bind(styles);

var className = cx('foo', ['bar'], { baz: true }); // => "abc def xyz"
```

Real-world example:

```js
/* components/submit-button.js */
import { Component } from 'react';
import { setCssModule } from 'mdc-classnames';
import styles from './submit-button.css';

let cx = setCssModule.bind(styles);

export default class SubmitButton extends Component {
  render () {
    let text = this.props.store.submissionInProgress ? 'Processing...' : 'Submit';
    let className = cx({
      base: true,
      inProgress: this.props.store.submissionInProgress,
      error: this.props.store.errorOccurred,
      disabled: this.props.form.valid,
    });
    return <button className={className}>{text}</button>;
  }
};

```