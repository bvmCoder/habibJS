/* eslint-disable */

export default class Draggable {
    constructor(element, options) {
        this.defaults = {
            // settings
            grid: 0,
            filterTarget: null,
            limit: {
                x: null,
                y: null // [minimum position, maximum position] || position
            },
            threshold: 0,
            // flags
            setCursor: false,
            setPosition: true,
            smoothDrag: true,
            useGPU: true,
            // event hooks
            onDrag: this.noop,
            onDragStart: this.noop,
            onDragEnd: this.noop // function(element, X, Y, event)
        };
        this.env = {
            // CSS vendor-prefixed transform property
            transform: ((() => {
                const prefixes = ' -o- -ms- -moz- -webkit-'.split(' ');
                const style = document.body.style;
                for (let n = prefixes.length; n--;) {
                    const property = `${prefixes[n]}transform`;
                    if (property in style) {
                        return property;
                    }
                }
            }))()
        };
        var env = this.env;
        // internal
        const me = this, start = this.bind(me.start, me), drag = this.bind(me.drag, me), stop = this.bind(me.stop, me);
        // sanity check
        if (!this.isElement(element)) {
            throw new TypeError('Draggable expects argument 0 to be an Element');
        }
        // set instance properties
        this.assign(me, {
            // DOM element
            element,
            // DOM event handlers
            handlers: {
                start: {
                    mousedown: start,
                    touchstart: start
                },
                move: {
                    mousemove: drag,
                    mouseup: stop,
                    touchmove: drag,
                    touchend: stop
                }
            },
            // options
            options: this.assign({}, this.defaults, options)
        });
        this.dragEvent = {
            started: false,
            x: 0,
            y: 0
        };
        this.addEvent = ('attachEvent' in Element.prototype)
            ? (element, e, fn) => { element.attachEvent(`on${e}`, fn); }
            : (element, e, fn) => { element.addEventListener(e, fn, false); };
        this.removeEvent = ('attachEvent' in Element.prototype)
            ? (element, e, fn) => { element.detachEvent(`on${e}`, fn); }
            : (element, e, fn) => { element.removeEventListener(e, fn); };
        // initialize
        me.initialize();
    }
    assign() {
        const obj = arguments[0];
        const count = arguments.length;
        for (let n = 1; n < count; n++) {
            const argument = arguments[n];
            for (const key in argument) {
                obj[key] = argument[key];
            }
        }
        return obj;
    }
    bind(fn, context) {
        return function () {
            fn.apply(context, arguments);
        };
    }
    on(element, e, fn) {
        if (e && fn) {
            this.addEvent(element, e, fn);
        }
        else if (e) {
            for (const ee in e) {
                this.addEvent(element, ee, e[ee]);
            }
        }
    }
    off(element, e, fn) {
        if (e && fn) {
            this.removeEvent(element, e, fn);
        }
        else if (e) {
            for (const ee in e) {
                this.removeEvent(element, ee, e[ee]);
            }
        }
    }
    // Example:
    //
    //     this.limit(x, limit.x)
    limit(n, limit) {
        // {Array} limit.x
        if (limit instanceof Array) {
            limit = [+limit[0], +limit[1]];
            if (n < limit[0])
                n = limit[0];
            else if (n > limit[1])
                n = limit[1];
        }
        else {
            n = +limit;
        }
        return n;
    }
    // public
    setOption(property, value) {
        const me = this;
        me.options[property] = value;
        me.initialize();
        return me;
    }
    get() {
        const dragEvent = this.dragEvent;
        return {
            x: dragEvent.x,
            y: dragEvent.y
        };
    }
    set(x, y) {
        const me = this, dragEvent = me.dragEvent;
        dragEvent.original = {
            x: dragEvent.x,
            y: dragEvent.y
        };
        me.move(x, y);
        return me;
    }
    initialize() {
        const env = this.env;
        const me = this;
        const element = me.element;
        const style = element.style;
        const compStyle = this.getStyle(element);
        const options = me.options;
        const transform = env.transform;
        let oldTransform;
        // cache element dimensions (for performance)
        const _dimensions = me._dimensions = {
            height: element.offsetHeight,
            left: element.offsetLeft,
            top: element.offsetTop,
            width: element.offsetWidth
        };
        // shift compositing over to the GPU if the browser supports it (for performance)
        if (options.useGPU && transform) {
            // concatenate to any existing transform
            // so we don't accidentally override it
            oldTransform = compStyle[transform];
            if (oldTransform === 'none') {
                oldTransform = '';
            }
            style[transform] = `${oldTransform} translate3d(0,0,0)`;
        }
        // optional styling
        if (options.setPosition) {
            style.display = 'block';
            style.left = `${_dimensions.left}px`;
            style.top = `${_dimensions.top}px`;
            style.bottom = style.right = 'auto';
            style.margin = 0;
            style.position = 'absolute';
        }
        if (options.setCursor) {
            style.cursor = 'move';
        }
        // set limit
        me.setLimit(options.limit);
        // set position in model
        this.assign(me.dragEvent, {
            x: _dimensions.left,
            y: _dimensions.top
        });
        // attach mousedown event
        this.on(me.element, me.handlers.start);
    }
    start(e) {
        const env = this.env;
        const me = this;
        const cursor = me.getCursor(e);
        const element = me.element;
        // filter the target?
        if (!me.useTarget(e.target || e.srcElement)) {
            return;
        }
        // prevent browsers from visually dragging the element's outline
        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            e.returnValue = false; // IE10
        }
        // set a high z-index, just in case
        me.dragEvent.oldZindex = element.style.zIndex;
        element.style.zIndex = 10000;
        // set initial position
        me.setCursor(cursor);
        me.setPosition();
        me.setZoom();
        // add event listeners
        this.on(document, me.handlers.move);
    }
    drag(e) {
        const env = this.env;
        const me = this, dragEvent = me.dragEvent, element = me.element, initialCursor = me._cursor, initialPosition = me._dimensions, options = me.options, zoom = initialPosition.zoom, cursor = me.getCursor(e), threshold = options.threshold, x = (cursor.x - initialCursor.x) / zoom + initialPosition.left, y = (cursor.y - initialCursor.y) / zoom + initialPosition.top;
        // check threshold
        if (!dragEvent.started && threshold &&
            (Math.abs(initialCursor.x - cursor.x) < threshold) &&
            (Math.abs(initialCursor.y - cursor.y) < threshold)) {
            return;
        }
        // save original position?
        if (!dragEvent.original) {
            dragEvent.original = { x, y };
        }
        // trigger start event?
        if (!dragEvent.started) {
            options.onDragStart(element, x, y, e);
            dragEvent.started = true;
        }
        // move the element
        if (me.move(x, y)) {
            // trigger drag event
            options.onDrag(element, dragEvent.x, dragEvent.y, e);
        }
    }
    move(x, y) {
        const env = this.env;
        const me = this;
        const dragEvent = me.dragEvent;
        const options = me.options;
        const grid = options.grid;
        const style = me.element.style;
        let pos = me.limit(x, y, dragEvent.original.x, dragEvent.original.y);
        // snap to grid?
        if (!options.smoothDrag && grid) {
            pos = me.round(pos, grid);
        }
        // move it
        if (pos.x !== dragEvent.x || pos.y !== dragEvent.y) {
            dragEvent.x = pos.x;
            dragEvent.y = pos.y;
            style.left = `${pos.x}px`;
            style.top = `${pos.y}px`;
            return true;
        }
        return false;
    }
    stop(e) {
        var env = this.env;
        const me = this;
        const dragEvent = me.dragEvent;
        const element = me.element;
        const options = me.options;
        const grid = options.grid;
        let pos;
        // remove event listeners
        this.off(document, me.handlers.move);
        // resent element's z-index
        element.style.zIndex = dragEvent.oldZindex;
        // snap to grid?
        if (options.smoothDrag && grid) {
            pos = me.round({ x: dragEvent.x, y: dragEvent.y }, grid);
            me.move(pos.x, pos.y);
            this.assign(me.dragEvent, pos);
        }
        // trigger dragend event
        if (me.dragEvent.started) {
            options.onDragEnd(element, dragEvent.x, dragEvent.y, e);
        }
        // clear temp vars
        me.reset();
    }
    reset() {
        this.dragEvent.started = false;
    }
    round(pos) {
        const grid = this.options.grid;
        return {
            x: grid * Math.round(pos.x / grid),
            y: grid * Math.round(pos.y / grid)
        };
    }
    getCursor(e) {
        return {
            x: (e.targetTouches ? e.targetTouches[0] : e).clientX,
            y: (e.targetTouches ? e.targetTouches[0] : e).clientY
        };
    }
    setCursor(xy) {
        this._cursor = xy;
    }
    setLimit(limit) {
        var env = this.env;
        const me = this, _true = (x, y) => ({
                x,
                y
            });
        // limit is a function
        if (this.isFunction(limit)) {
            me.limit = limit;
        }
        else if (this.isElement(limit)) {
            const draggableSize = me._dimensions, height = limit.scrollHeight - draggableSize.height, width = limit.scrollWidth - draggableSize.width;
            me.limit = (x, y) => ({
                x: this.limit(x, [0, width]),
                y: this.limit(y, [0, height])
            });
        }
        else if (limit) {
            const thisLimit = this.limit;
            const defined = {
                x: this.isDefined(limit.x),
                y: this.isDefined(limit.y)
            };
            let _x, _y;
            // {Undefined} limit.x, {Undefined} limit.y
            if (!defined.x && !defined.y) {
                me.limit = _true;
            }
            else {
                me.limit = (x, y) => ({
                    x: defined.x ? thisLimit(x, limit.x) : x,
                    y: defined.y ? thisLimit(y, limit.y) : y
                });
            }
        }
        else {
            me.limit = _true;
        }
    }
    setPosition() {
        var env = this.env;
        const me = this, element = me.element, style = element.style;
        this.assign(me._dimensions, {
            left: this.parse(style.left) || element.offsetLeft,
            top: this.parse(style.top) || element.offsetTop
        });
    }
    setZoom() {
        const me = this;
        let element = me.element;
        let zoom = 1;
        while (element = element.offsetParent) {
            const z = this.getStyle(element).zoom;
            if (z && z !== 'normal') {
                zoom = z;
                break;
            }
        }
        me._dimensions.zoom = zoom;
    }
    useTarget(element) {
        const filterTarget = this.options.filterTarget;
        if (filterTarget instanceof Function) {
            return filterTarget(element);
        }
        return true;
    }
    destroy() {
        var env = this.env;
        this.off(this.element, this.handlers.start);
        this.off(document, this.handlers.move);
    }
    // helpers
    parse(string) {
        return parseInt(string, 10);
    }
    getStyle(element) {
        return 'currentStyle' in element ? element.currentStyle : getComputedStyle(element);
    }
    isDefined(thing) {
        return thing !== void 0 && thing !== null;
    }
    isElement(thing) {
        return thing instanceof Element || thing instanceof HTMLDocument;
    }
    isFunction(thing) {
        return thing instanceof Function;
    }
}
