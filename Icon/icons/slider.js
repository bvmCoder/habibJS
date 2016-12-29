export const slider = (color = "#7F7F7F") => {
    return {
        'svg': `<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><g><g transform="translate(0.000000, 1.000000)"><path d="M14.5,0 L14.5,20" stroke=${color} stroke-linecap="round"></path><path d="M11.5,0 L11.5,20" stroke=${color} stroke-linecap="round"></path><polygon fill=${color} points="19.5 8.66666667 19.5 6 25.4954224 9.99871826 19.5 14 19.5 11.3333333 14 11.3333333 14 8.66666667"></polygon><path d="M6.5,8.66666667 L6.5,6 L0.504943848,10.1793213 L6.5,14 L6.5,11.3333333 L12,11.3333333 L12,8.66666667 L6.5,8.66666667 Z" fill=${color}></path></g><rect x="0" y="0" width="26" height="22"></rect></g></g></g>`,
        'height': 22,
        'width': 26,
        'viewBox': '0 0 26 22'
    };
};