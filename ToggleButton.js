const TheToggleButton = React.createClass({
    getInitialState() {
        return {
            isLoading: false,
            selected: 1
        };
    },
    clicked(ind) {
        console.log("The button index clicked: " + ind);
        this.setState({ selected: ind });
    },
    render() {
        return (<ToggleButton selected={this.state.selected} onToggle={this.clicked}>
          <Button>Entity</Button>
          <Button>Priority</Button>
          <Button>Weight</Button>
       </ToggleButton>);
    }
});

ReactDOM.render(<TheToggleButton />, mountNode);
