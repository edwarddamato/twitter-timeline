import * as React from 'react';
import { Store } from '../../store';
import { LoadingAction, ResultsAction, SearchAction } from '../../store/actions';
import { Twitter } from '../../services/twitter'
import { ITweet, ILocation, ICoords } from '../../../common/interfaces.d';
import './SearchPanel.scss';

interface ISearchPanelProps { location: ICoords; }
interface ISearchPanelState {
  [x: string]: any;
}

export class SearchPanel extends React.Component<ISearchPanelProps, ISearchPanelState> {
  constructor (props) {
    super(props);

    this.state = {
      keywords: '',
      location: {
        longitude: 0,
        latitude: 0,
        radius: 5
      }
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  private onTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const eventTargetName: string = event.target.name;
    const eventTargeTValue: string = event.target.value;
    switch (eventTargetName) {
      case 'radius':
        this.setState({
          location: Object.assign({}, this.state.location, {
            radius: eventTargeTValue
          })
        });
        break;
      default:
        this.setState({ [eventTargetName]: eventTargeTValue });
        break;
    }
  }

  componentWillReceiveProps(nextProps: ISearchPanelProps) {
    this.setState({ 
      location: Object.assign({}, this.state.location, {
        longitude: nextProps.location.longitude,
        latitude: nextProps.location.latitude 
      })
    });
  }

  private handleClick(): void {
    this.loadTweets();
  }

  private async loadTweets () {
    const keywords: Array<string> = this.state.keywords.split(' ');
    if (this.state.keywords.length === 0 || keywords.length === 0) return;

    Store.Dispatch(LoadingAction, true);
    const tweets:Array<ITweet> = await Twitter.GetTweets({
      keywords: this.state.keywords.split(' '),
      longitude: this.state.location.longitude,
      latitude: this.state.location.latitude,
      radius: this.state.location.radius
    });
    Store.Dispatch(ResultsAction, tweets);
    Store.Dispatch(LoadingAction, false);
  }

  render () {
    return (
      <section className="search-panel form">
        <div className="search-panel_field form_field">
          <label className="search-panel_label form_label" htmlFor="txtKeywords">Keywords</label>
          <input type="text" onChange={this.onTextChange} name="keywords" value={this.state.keywords} id="txtKeywords" placeholder="E.g: keyword1 keyword2" className="search-panel_input form_input" />
        </div>
        <div className="search-panel_field form_field">
          <label className="search-panel_label form_label" htmlFor="txtLocation">Location</label>
          <input type="text" name="location" value={`${this.state.location.longitude}, ${this.state.location.latitude}`} id="txtLocation" readOnly placeholder="Enable browser geolocation" className="search-panel_input form_input form_input--small-text" />
        </div>
        <div className="search-panel_field form_field">
          <label className="search-panel_label form_label" htmlFor="txtRadius">Radius</label>
          <input type="number" onChange={this.onTextChange} name="radius" value={this.state.location.radius} id="txtRadius" placeholder="10 (miles)" className="search-panel_input form_input" />
        </div>
        <div className="search-panel_action form_actions">
          <button className="form_button" onClick={this.handleClick}>Search!</button>
        </div>
      </section>
    );
  }
}

export default SearchPanel;
