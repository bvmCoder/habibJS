const labelsInstance = (<div>
    <Label block for="someId">Original label</Label>
    <Label block>Default label</Label>
    <Label block disabled>Disabled label</Label>
    <Label block>label is block</Label>
    <Label block html>{"html example <a href = 'https://www.moodys.com'>moodys.com</a>"}</Label>
    <Label block maxLength="12" color="MA-BLUE">label maxLength is 12</Label>
    <Label block className="custom">label className is custom</Label>
    <Label block type="LABEL-STANDARD">label type is LABEL-STANDARD</Label>
    <Label block type="Body-Secondary" tooltip="hi there!">mouseover to show tooltip</Label>
  </div>);
ReactDOM.render(labelsInstance, mountNode);
