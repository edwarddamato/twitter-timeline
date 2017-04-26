import * as React from 'react';
import './Loader.scss';

interface LoaderProps { loading: boolean; }
interface ILoaderState {
  loading: boolean;
}

export class Loader extends React.Component<LoaderProps, ILoaderState> {
  constructor (props) {
    super(props);

    this.state = {
      loading: this.props.loading
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  render () {
    return (
      this.state.loading
      ? <div className="loader">
          <div className="loader_spinner-container">
            <span className="loader_spinner-text">Getting your tweets</span>
          </div>
          <ul className="loader_box-list">
            {
              ['blue', 'red'].map(color => {
                return <li key={color} className={`loader_box-item loader_box-item--${color}`}></li>;
              })
            }
          </ul>
        </div>
      : null);
  }
}

export default Loader
