let scrollbarWidth;

// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
    position: "absolute",
    top: "-9999px",
    width: "50px",
    height: "50px",
    overflow: "scroll"
};

export const measureScrollbar = () => {
    if (typeof document === "undefined" || typeof window === "undefined") {
        return 0;
    }
    if (scrollbarWidth) {
        return scrollbarWidth;
    }
    const scrollDiv = document.createElement("div");
    for (const scrollProp in scrollbarMeasure) {
        if (scrollbarMeasure.hasOwnProperty(scrollProp)) {
            scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
        }
    }
    document.body.appendChild(scrollDiv);
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    scrollbarWidth = width;
    return scrollbarWidth;
};

/* eslint "consistent-this": 0 */
/* eslint "no-invalid-this": 0 */
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function debounceFunc() {
        const context = this;
        const args = arguments;
        if (args[0] && args[0].persist) {
            args[0].persist();
        }
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
