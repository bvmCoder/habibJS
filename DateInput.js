const TheDateInput = React.createClass({
    getInitialState() {
        return {
            isLoading: false
        };
    },
    render() {
        return (<DateInput format='MM/DD/YYYY'/>);
    }
});

ReactDOM.render(<TheDateInput />, mountNode);
