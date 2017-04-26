import { ITweet, ISearchParams } from '../../../common/interfaces.d';
import { Utils } from '../../utils';

export class Api {
  private static readonly serverUrl: string = 'http://localhost:4000/api/search';
  private static readonly headers: Headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  public static async Fetch(searchParams: ISearchParams): Promise<Array<ITweet>> {
    const searchQueryString: string = Utils.GetQuerystringFromObject(searchParams);
    const response: Response = await fetch(`${this.serverUrl}?${searchQueryString}`, {
      method: 'GET',
      headers: this.headers
    });
    const json:Promise<any> = await response.json();
    const tweets:Promise<Array<ITweet>> = json;
    return tweets;
  }
}