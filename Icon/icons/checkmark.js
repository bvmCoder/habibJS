export const checkmark = (color = "#CD9C54") => {
    return {
        'svg': `<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><g><g transform="translate(2.000000, 1.000000)"><g><path d="M6.5,0 C2.910375,0 0,2.910375 0,6.5 C0,10.089625 2.910375,13 6.5,13 C10.089625,13 13,10.089625 13,6.5 C13,2.910375 10.089625,0 6.5,0 L6.5,0 Z" stroke=${color}></path><polygon fill=${color} points="8.9375 3.732625 10.079875 4.875 5.6875 9.267375 2.920125 6.5 4.0625 5.357625 5.6875 6.982625 8.9375 3.732625"></polygon></g></g><rect x="0" y="0" width="16" height="16"></rect></g></g></g>`,
        'height': 16,
        'width': 16,
        'viewBox': '0 0 16 16'
    };
};
