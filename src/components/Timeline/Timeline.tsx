import * as React from 'react';
import { ITweet } from '../../../common/interfaces.d';
import { Tweet } from './Tweet';
import './Timeline.scss';

interface TimelineProps { tweets: Array<ITweet>; }

export class Timeline extends React.Component<TimelineProps, undefined> {
  render () {
    return (
      <section className="timeline">
        <ul className="tweet_list">
          {
            this.props.tweets.map((tweet, index) => {
              return (
                <li key={index} className="tweet_item">
                  <Tweet tweet={tweet} />
                </li>)
            })
          }
        </ul>
      </section>
    );
  }
}

export default Timeline;
