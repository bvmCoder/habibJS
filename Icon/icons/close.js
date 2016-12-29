export const close = (color = "#BFBFBF") => {
    return {
        'svg': `<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><g><rect x="0" y="0" width="16" height="16"></rect><g transform="translate(3.000000, 3.000000)" fill=${color}><rect transform="translate(5.000000, 5.000000) rotate(45.000000) translate(-5.000000, -5.000000) " x="-0.905420992" y="3.96296296" width="11.810842" height="2.07407407"></rect><rect transform="translate(5.000000, 5.000000) scale(-1, 1) rotate(45.000000) translate(-5.000000, -5.000000) " x="-0.905420992" y="3.96296296" width="11.810842" height="2.07407407"></rect></g></g></g></g>`,
        'height': 16,
        'width': 16,
        'viewBox': '0 0 16 16'
    };
};
