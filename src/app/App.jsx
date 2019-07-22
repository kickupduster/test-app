import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={() => 'Hellow'} />
    </Router>
  </Provider>
);

export default App;
