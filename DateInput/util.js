const _keyDownViewHelper = [
    {
        exit: true,
        next: true,
        prev: false,
        unit: 'day',
        upDown: 7
    },
    {
        next: true,
        prev: true,
        unit: 'months',
        upDown: 3
    },
    {
        next: false,
        prev: true,
        unit: 'years',
        upDown: 3
    }
];
const KEYS = {
    backspace: 8,
    down: 40,
    enter: 13,
    esc: 27,
    left: 37,
    right: 39,
    up: 38
};
export default {
    toDate(date) {
        return date instanceof Date ? date : new Date(date);
    },
    keyDownActions(code) {
        const _viewHelper = _keyDownViewHelper[this.state.currentView];
        const unit = _viewHelper.unit;
        switch (code) {
            case KEYS.left:
                this.setDate(this.state.date.subtract(1, unit));
                break;
            case KEYS.right:
                this.setDate(this.state.date.add(1, unit));
                break;
            case KEYS.up:
                this.setDate(this.state.date.subtract(_viewHelper.upDown, unit));
                break;
            case KEYS.down:
                this.setDate(this.state.date.add(_viewHelper.upDown, unit));
                break;
            case KEYS.enter:
                if (_viewHelper.prev) {
                    this.prevView(this.state.date);
                }
                if (_viewHelper.exit) {
                    this.setState({ isVisible: false });
                }
                break;
            case KEYS.esc:
                this.setState({ isVisible: false });
                break;
            default:
                break;
        }
    }
};
