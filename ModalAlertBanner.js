const ModalAlertBannerInstance = React.createClass({
    getInitialState() {
        return {
            modalVisible: false
        };
    },
    showModal() {
        this.setState({ modalVisible: true });
    },
    hideModal() {
        this.setState({ modalVisible: false });
    },
    render() {
        return (<div>
          <button onClick={this.showModal}>Display Modal</button>
          <Modal visible={this.state.modalVisible} onRequestClose={this.hideModal} title='Model with AlertBanner'>
            <AlertBanner inline><div>AlertBanner content</div></AlertBanner>
            <div>
                Modal Dialog Content
            </div>
          </Modal>
        </div>);
    }
});

ReactDOM.render(<ModalAlertBannerInstance />, mountNode);
