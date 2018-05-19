import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import createHistory from 'history/createBrowserHistory'

import { ILoginState, loginReducer  } from './login/reducers';

import { middleware as reduxPackMiddleware } from 'redux-pack'

export interface IRootState {
  login: ILoginState;
  router: RouterState;
}

export const rootReducer = combineReducers<IRootState>({
  login: loginReducer,
  router: routerReducer
});

declare var window: any;

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose;

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);


const configureStore = (initialState?: IRootState) => {
  // configure middlewares
  const middlewares = [historyMiddleware,reduxPackMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );
  // create store
  return createStore(
    rootReducer,
    initialState!,
    enhancer
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;