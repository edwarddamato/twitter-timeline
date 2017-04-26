import { ITweet, ITweetUser, IMention } from '../../../common/interfaces.d';

export class Formatter {
  public static Format(jsonObject: object): Array<ITweet> {
    const temp = [];
    const tweets: Array<ITweet> = Array.from(jsonObject['statuses']).map<ITweet>((status: any) => {
      return {
        text: status.text,
        hashtags: Array.from(status.entities.hashtags).map<string>((hashtag: any) => {
          return `#${hashtag.text}`
        }),
        mentions: Array.from(status.entities.user_mentions).map<IMention>((mention: any) => {
          return {
            name: mention.name,
            username: mention.screen_name,
            indices: mention.indices
          }
        }),
        user: {
          fullName: status.user.name,
          userProfileImgUrl: status.user.profile_image_url,
          username: status.user.screen_name
        },
        date: new Date(status.created_at)
      };
    });
    return tweets;
  }
}