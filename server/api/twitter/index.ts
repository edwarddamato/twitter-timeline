import { Formatter } from './formatter';
import { ITweet, ISearchParams } from '../../../common/interfaces.d';
import fetch from 'node-fetch';

export class Api {
  // add twtiter auth token here!
  private static readonly auth: string = 'Bearer --TOKEN HERE--';
  private static readonly twitterUrl: string = 'https://api.twitter.com/1.1/search/tweets.json';

  public static async Fetch(searchParams: ISearchParams): Promise<Array<ITweet>> {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': Api.auth
      },
      credentials: 'include'
    };
    
    const hasLocation = (searchParams.latitude && searchParams.longitude && searchParams.radius);
    const searchUrl = `${this.twitterUrl}?q=${searchParams.keywords}${hasLocation ? `&geocode=${searchParams.latitude},${searchParams.longitude},${searchParams.radius}mi` : ''}`;
    console.log(searchUrl);

    const response = await fetch(searchUrl, requestOptions);
    const json:Promise<any> = await response.json();
    return Formatter.Format(json);
  }
}