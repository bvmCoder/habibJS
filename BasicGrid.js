const cellStyle = {
    background: '#eee',
    height: '100px',
    marginBottom: '20px',
    position: 'relative'
};
const cellValueStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    color: '#888',
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: '#FFF',
    textAlign: 'center',
    lineHeight: '50px',
    zIndex: 100
};
const CellValue = React.createClass({
    render() {
        return (<div style={cellValueStyle}>
        {this.props.value}
      </div>);
    }
});
const Cell = React.createClass({
    render() {
        return (<div style={cellStyle}>
          {this.props.children}
        </div>);
    }
});
const grid = (<Grid columnWidth={80} gutterWidth={5}>
		<Row>
      <Column width='6/18'>
        <Cell><CellValue value='6/18'/></Cell>
      </Column>
      <Column width='6/18' offset='6/18'>
        <Cell><CellValue value='6/18'/></Cell>
      </Column>
    </Row>
		<Row>
      <Column width='3/12'>
        <Cell><CellValue value='3/12'/></Cell>
      </Column>
      
      <Column width='6/12'>
        <Cell><CellValue value='6/12'/></Cell>
      </Column>
      <Column width='3/12'>
        <Cell><CellValue value='3/12'/></Cell>
      </Column>
    </Row>
		<Row>
      <Column width='4/4'>
        <Cell><CellValue value='4/4'/></Cell>
      </Column> 
    </Row>     
    <Row>
      <Column width='3/12' offset='9/12'>
        <Cell><CellValue value='3/12'/></Cell>
      </Column>
    </Row>    
  </Grid>);
ReactDOM.render(grid, mountNode);
