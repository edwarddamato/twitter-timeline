import { ICoords } from '../../common/interfaces.d';

export class GeoLocation {
  public static Watch(callback: ((coords?: ICoords) => void)): void {
    if ('geolocation' in navigator) {
      this.WatchPosition(callback);
    } else {
      callback();
    }
  }

  private static WatchPosition(callback: ((coords?: ICoords) => void)) {
    navigator.geolocation.watchPosition(position => {
      callback({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      });
    });
  }
}