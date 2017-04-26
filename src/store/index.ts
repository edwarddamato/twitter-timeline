import { DispatchAction } from './interfaces.d';
import { ITweet, ICoords } from '../../common/interfaces.d';
import { Action, LoadingAction, ResultsAction, SearchAction, LocationAction } from './actions';
import { createStore } from 'redux';

const execute = (action: DispatchAction, op: (StoreKey: any) => any): (StoreKey: any) => any => {
  const partialState = { [action.type.stateKey]: action.data };
  return op(partialState);
};

const reducer = (state: any, action: DispatchAction) => {
  const newState = execute(action, partialState => {
    return Object.assign({}, state, partialState);
  });
  return newState || state;
};

const store = createStore(reducer, {
  loading: false,
  location: [],
  searchState: {
    state: 0,
  },
  results: []
});

export class Store {
  public static Dispatch(action: Action, data: any): void {
    store.dispatch({ type: action, data });
  }
  public static GetState(action?: Action): any {
    if (action) {
      return store.getState()[action.stateKey];
    } else {
      return store.getState();
    }
  }
  public static GetLoadingState(): boolean {
    return Store.GetState(LoadingAction);
  }
  public static GetTweets(): Array<ITweet> {
    return Store.GetState(ResultsAction);
  }
  public static GetLocation(): ICoords {
    return Store.GetState(LocationAction);
  }
  public static Subscribe(subscribe: () => any): void {
    store.subscribe(subscribe);
  }
}