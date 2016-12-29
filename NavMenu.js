const DefaultNavMenu = React.createClass({
    render() {
        var menuItems = [
            {
                label: 'Summary',
                url: "",
                disabled: false,
                active: true,
                pjax: true,
                children: []
            },
            {
                label: 'Research',
                url: "",
                disabled: false,
                pjax: true,
                active: false
            },
            {
                label: 'Ratings',
                url: "",
                disabled: false,
                pjax: true,
                active: false
            },
            {
                label: 'Capital Structure',
                url: "",
                disabled: false,
                pjax: true,
                active: false
            },
            {
                label: 'Financials',
                url: "",
                disabled: false,
                active: false,
                children: [
                    { label: 'key Indicators', url: "", disabled: false, pjax: true, active: true },
                    { label: 'Income Statement', url: "", disabled: false, pjax: true },
                    { label: 'Balance Sheet', url: "", disabled: false },
                    { label: 'Supplemental Data', url: "http://www.moodys.com", target: "_blank", pjax: true, disabled: false },
                    { label: 'All Ratios', url: "http://www.moodys.com", disabled: true }
                ]
            },
            {
                label: 'Market Signals',
                url: "http://www.moodys.com",
                disabled: false,
                active: false
            },
            {
                label: 'Disable - demo',
                url: "http://www.moodys.com",
                disabled: true,
                active: false
            }
        ];
        return <NavMenu menuItems={menuItems} topBold/>;
    }
});
ReactDOM.render(<DefaultNavMenu />, mountNode);
