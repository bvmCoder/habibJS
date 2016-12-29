const TheTabs = React.createClass({
    getInitialState() {
        return {
            isLoading: false
        };
    },
    onBeforeChange: (selectedIndex, $selectedPanel) => {
        console.log('before the tab ' + $selectedPanel);
    },
    onAfterChange: (selectedIndex) => {
        console.log('after the tab ' + selectedIndex);
    },
    render() {
        return (<Tabs tabActive={1} onBeforeChange={this.onBeforeChange} onAfterChange={this.onAfterChange}>
        <TabPanel title='Tab One'>
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry, for TAB One</div>
        </TabPanel>
        <TabPanel title='Tab Two'>
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry, for TAB Two</div>
        </TabPanel>
        <TabPanel title='Tab Three'>
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry, for TAB Three</div>
        </TabPanel>
        <TabPanel title='Tab Four'>
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry, for TAB Four</div>
        </TabPanel>
        <TabPanel title='Tab Five' disabled="true">
          <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry, for TAB Five</div>
        </TabPanel>
      </Tabs>);
    }
});

ReactDOM.render(<TheTabs />, mountNode);
