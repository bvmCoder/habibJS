const DefaultModal = React.createClass({
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
    onSaveClick() {
        console.log('save');
        this.hideModal();
    },
    onCancelClick() {
        console.log('cancel');
        this.hideModal();
    },
    render() {
        let buttons = (<ButtonToolbar>
        <Button onClick={this.onCancelClick}>Cancel</Button>
        <Button onClick={this.onSaveClick}>Save</Button>
      </ButtonToolbar>);
        return (<div>
            <button onClick={this.showModal}>display modal</button>
            <Modal visible={this.state.modalVisible} onRequestClose={this.hideModal} title='Email Preferences' footer={buttons}>
                Hi, modal content
            </Modal>
    </div>);
    }
});
ReactDOM.render(<DefaultModal />, mountNode);
