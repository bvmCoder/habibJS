import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './app/App';
import { Intro } from './intro/Intro';
import { Docs } from './docs/Docs';
import { Readme } from './docs/Readme';
import { Guidelines } from './docs/Guidelines';
import { Components } from './components/Components';
import { NotFound } from './NotFound';
import { demoApp } from './reducers';
import { ComponentRoutes } from './components/ComponentsNav';
const reducers = require('./reducers');

// sample boiler plate for setting up redux
const configureStore = () => {
    const store = createStore(demoApp);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = reducers.demoApp;
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};

const store = configureStore();
const subRoutes = ComponentRoutes.map((route, indx) => {
    return React.cloneElement(route, { key: indx });
});

class Main extends React.Component {
    render() {
        return (<Provider store={store}>
        <div>
          <Router history={browserHistory}>
            <Route path='/' component={App}>
              <IndexRoute component={Intro}/>
              <Route path='docs' component={Docs}>
                <IndexRoute component={Readme}/>
                <Route path='readme' component={Readme}/>
                <Route path='guidelines' component={Guidelines}/>
              </Route>
              <Route path='components' component={Components}>
                {subRoutes}
              </Route>
            </Route>
            <Route path='*' component={NotFound}/>
          </Router>
        </div>
     </Provider>);
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
