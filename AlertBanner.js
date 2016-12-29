const AlertBannerInstance = React.createClass({
    render() {
        return (<AlertBanner>
                    <div>
                        <Icon icon="checkmark"/> &nbsp;
                        Basic AlertBanner with auto open and close.
                    </div>
            </AlertBanner>
        );
    }
});
ReactDOM.render(<AlertBannerInstance />, mountNode);
