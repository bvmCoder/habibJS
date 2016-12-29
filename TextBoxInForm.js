const formElementStyle = {
    marginTop: '20px'
};
const FormElement = React.createClass({
    render() {
        return (<div style={formElementStyle}> {this.props.children} </div>);
    }
});
const TextBoxInstance = React.createClass({
    render() {
        return (<Grid columnWidth={80} gutterWidth={60}>
        <Row>
          <Column width="1/1">
            <FormElement>
                <TextBox value="Hello" onChange={this.handleTextChange} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
            </FormElement>
          </Column>
        </Row>
        <Row>
          <Column width="1/2">
            <FormElement>
                <TextBox value={"Error 1"} error/>
            </FormElement>
          </Column>
          <Column width="1/2">
            <FormElement>
                <TextBox value={"Right cell"}/>
            </FormElement>
          </Column>
        </Row>
        <Row>
          <Column width="1/2">
            <FormElement>
                <TextBox value="Fixed width and error" disabled={false} width={130} error/>
            </FormElement>
            <FormElement>
                <TextBox value="Custom width (disabled)" disabled={true} width={'70%'}/>
            </FormElement>
          </Column>
          <Column width="1/2">
            <FormElement>
                <TextBox value="Multiline" multiline height='80px'/>
            </FormElement>
          </Column>
         </Row>
      </Grid>);
    },
    handleTextChange() {
        console.log('the text in input has been changed');
    },
    handleFocus() {
        console.log('the  input is on focus');
    },
    handleBlur() {
        console.log('the  input is on blur');
    }
});

ReactDOM.render(<TextBoxInstance />, mountNode);
