import { compose, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { compact } from 'lodash';
import reducer from '../reducer';

const history = createBrowserHistory();
const isDevelopment = process.env.NODE_ENV === 'development';
const loggerMiddleware = createLogger({ level: 'info', collapsed: true });
const middlewares = [
  thunkMiddleware,
  isDevelopment && loggerMiddleware,
  routerMiddleware(history),
];
const composedStore = compose(applyMiddleware(...compact(middlewares)));
const storeCreator = composedStore(createStore);
const store = storeCreator(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
);

export { history };

export default store;
