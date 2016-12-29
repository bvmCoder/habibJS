const buttonGroupInstance = (<div>
    <div>
      <ButtonGroup>
        <ButtonGroupItem>1Y</ButtonGroupItem>
        <ButtonGroupItem onClick={ () => { console.log('clicked!'); }}>2Y</ButtonGroupItem>
        <ButtonGroupItem>3Y</ButtonGroupItem>
        <ButtonGroupItem>4Y</ButtonGroupItem>
        <ButtonGroupItem>5Y</ButtonGroupItem>
      </ButtonGroup>
    </div>
    <div>
      <ButtonGroup type="big" style={{ marginTop: '20px' }}>
        <ButtonGroupItem>big</ButtonGroupItem>
        <ButtonGroupItem>big</ButtonGroupItem>
        <ButtonGroupItem>big</ButtonGroupItem>
        <ButtonGroupItem>big</ButtonGroupItem>
        <ButtonGroupItem>big</ButtonGroupItem>
      </ButtonGroup>
    </div>
  </div>);
ReactDOM.render(buttonGroupInstance, mountNode);
