import * as React from 'react';
import { SearchPanel } from '../SearchPanel';
import { Header } from '../Header';
import { Timeline } from '../Timeline';
import { Loader } from '../Loader';
import { Store } from '../../store';
import { ITweet, ICoords } from '../../../common/interfaces.d';
import { GeoLocation } from '../../utils/geolocation';
import { LocationAction } from '../../store/actions';
import './App.scss';

interface IAppState {
  loading: boolean;
  location: ICoords;
  results: Array<ITweet>
}

export class App extends React.Component<undefined, IAppState> {
  constructor (props: undefined) {
    super(props);

    this.state = {
      loading: Store.GetLoadingState(),
      results: Store.GetTweets(),
      location: Store.GetLocation(),
    };

    Store.Subscribe(() => {
      console.info('Store change', Store.GetState());
      this.setState({ loading: Store.GetLoadingState() });
      this.setState({ results: Store.GetTweets() });
      this.setState({ location: Store.GetLocation() });
    });
  }

  public componentDidMount () {
    GeoLocation.Watch((coords: ICoords) => {
      if (coords) {
        Store.Dispatch(LocationAction, coords);
      }
    });
  }

  public render () {
    return (
      <div className="root_container">
        <Header />
        <SearchPanel location={this.state.location} />
        <Loader loading={this.state.loading} />
        <Timeline tweets={this.state.results} />
      </div>
    );
  }
}

export default App;
