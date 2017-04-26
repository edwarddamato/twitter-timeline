import * as React from 'react';
import { ITweet } from '../../../../common/interfaces.d';
import { format, differenceInMinutes } from 'date-fns';
import './Tweet.scss';

interface TweetProps { tweet: ITweet; }

export class Tweet extends React.Component<TweetProps, undefined> {
  private generateTweetText(tweet: ITweet): JSX.Element {
    return (
      <span>
        {
          tweet.text
            .split(' ')
            .map((textPiece: string, index: number) => {
              return tweet.hashtags.includes(textPiece)
                ? <span key={index} className="tweet_hashtag">{`${textPiece} `}</span>
                : `${textPiece} `;
            })
        }
      </span>);
  }
  render () {
    const tweet:ITweet = this.props.tweet;
    const minsIn24h:number = 24 * 60;
    const minsFromTweet:number = differenceInMinutes(new Date(), tweet.date);
    const tweetDate:Date | string =
      minsFromTweet >= minsIn24h 
        ? format(tweet.date, 'MMM DD')
        : `${Math.ceil(minsFromTweet / 60)}h`;

    return (
      <section className="tweet">
        <div className="tweet_user">
          <img className="tweet_user-img" src={tweet.user.userProfileImgUrl} />
        </div>
        <div className="tweet_content">
          <div className="tweet_header">
            <span className="tweet_header-fullname">{tweet.user.fullName}</span>
            <span className="tweet_header-username">@{tweet.user.username}</span>
            <span className="tweet_header-date">{tweetDate}</span>
          </div>
          <div className="tweet_container">
            {this.generateTweetText(tweet)}
          </div>
        </div>
      </section>
    );
  }
}

export default Tweet;
