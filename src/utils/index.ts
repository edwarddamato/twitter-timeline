export class Utils {
  public static GetQuerystringFromObject: ((object: any) => string) = (object: any) => {
    return `${Object.keys(object)
      .map<string>((objKey: string) => {
        let objVal: any = object[objKey];
        if (objVal instanceof Array) {
          objVal = objVal.join('+');
        }
        return `${objKey}=${objVal}`
      })
      .join('&')}`;
  }
}