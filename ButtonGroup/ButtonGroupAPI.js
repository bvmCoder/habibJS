class ButtonGroupApiInstance extends React.Component {
    constructor() {
        super();
        this.state = {
            thisIndex: 0,
            nextIndex: 2,
            alert: null
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleChangeIndexManually = this.handleChangeIndexManually.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.t = null;
    }
    handleOnChange(thisIndex, nextIndex) {
        this.setState({ 
            thisIndex,
            nextIndex
        });
    }
    handleChangeIndexManually() {
        const childNum = 5;
        if (this.state.nextIndex === (childNum - 1)) {
            this.setState({
                thisIndex: this.state.nextIndex,
                nextIndex: 0
            });
        } else {
            this.setState({
                thisIndex: this.state.nextIndex,
                nextIndex: this.state.nextIndex + 1
            });
        }
    }
    handleItemClick(e, reactElement) {
        if (this.t) {
            clearTimeout(this.t);
        }
        e.preventDefault();
        console.log(reactElement);
        const alert = `Oh, you clicked ${reactElement.props.children} !
                      This is the ${reactElement.props.index} button !`;
        this.setState({
            alert
        });
        this.t = setTimeout(() => {
            this.setState({
                alert: null
            });
        }, 2000);
    }
    componentWillUnmount() {
        if (this.t) {
            clearTimeout(this.t);
        }
    }
    render() {
        return (<div>
                <p>{`Last Selected Index: ${this.state.thisIndex}`}</p>
                <p>{`Current Selected Index: ${this.state.nextIndex}`}</p>
                <p style={{ color: 'Crimson' }}>{this.state.alert}</p>
                <div>
                    <ButtonGroup type='big' defaultIndex={2} onChange={this.handleOnChange} selectedIndex={this.state.nextIndex} style={{ marginBottom: '30px' }}>
                        <ButtonGroupItem onClick={this.handleItemClick}>
                            New York
                        </ButtonGroupItem>
                        <ButtonGroupItem onClick={this.handleItemClick}>
                            Shang Hai
                        </ButtonGroupItem>
                        <ButtonGroupItem onClick={this.handleItemClick}>
                            San Francisco
                        </ButtonGroupItem>
                        <ButtonGroupItem onClick={this.handleItemClick}>
                            Tokyo
                        </ButtonGroupItem>
                        <ButtonGroupItem onClick={this.handleItemClick}>
                            Shen Zhen
                        </ButtonGroupItem>
                    </ButtonGroup>
                </div>
                <Button primary onClick={this.handleChangeIndexManually}> 
                    press to manually change the selected items 
                </Button>
            </div>);
    }
}

ReactDOM.render(<ButtonGroupApiInstance />, mountNode);
