const buttonsInstance = (<ButtonToolbar>
    <Button>Button</Button>
    <Button disabled>Disabled</Button>
    <Button primary>Primary button</Button>
    <Button primary disabled>Primary Disabllled</Button>
  </ButtonToolbar>);
ReactDOM.render(buttonsInstance, mountNode);
