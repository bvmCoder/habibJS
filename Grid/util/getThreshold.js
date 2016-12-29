// using documentElement because
// clientWidth doesnt subtract the scroll bar
const getWindowWidth = () => {
    if (typeof window === 'undefined') {
        return Infinity;
    }
    return document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth;
};

export default function getThreshold(thresholds) {
    /* eslint-disable no-empty */
    const width = getWindowWidth();
    let b = thresholds.length;
    while (--b && width < thresholds[b]) { }
    return b;
}
