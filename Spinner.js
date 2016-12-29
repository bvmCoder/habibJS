const SpinnerInstance = (<div>
        <Spinner> Default </Spinner>
        <Spinner size={60} lineWidth={2} color={'rgb(64,134,191)'} fontStyle={{ fontStyle: 'italic' }}> Custom </Spinner>
    </div>);
ReactDOM.render(SpinnerInstance, mountNode);
