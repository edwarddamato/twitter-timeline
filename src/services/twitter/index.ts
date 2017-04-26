import { ITweet, ISearchParams } from '../../../common/interfaces.d';
import { Api } from './api';

export class Twitter {
  public static async GetTweets(searchParams: ISearchParams): Promise<Array<ITweet>> {
    return await Api.Fetch(searchParams);
  }
}