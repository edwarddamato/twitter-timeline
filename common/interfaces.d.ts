interface ITweetUser {
  readonly fullName: string;
  readonly username: string;
  readonly userProfileImgUrl: string;
}
interface IMention {
  readonly name: string;
  readonly indices: Array<number>;
  readonly username: string;
}
export interface ITweet {
  readonly user: ITweetUser;
  readonly hashtags: Array<string>;
  readonly mentions: Array<IMention>;
  readonly text: string;
  readonly date: Date;
}
export interface ILocation {
  readonly coords?: ICoords;
  readonly radius: number;
}
export interface ICoords {
  readonly longitude: number;
  readonly latitude: number;
}
export interface ISearchParams {
  keywords: Array<string>;
  longitude?: number;
  latitude?: number;
  radius?: number;
}