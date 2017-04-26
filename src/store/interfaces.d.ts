interface IAction {
  readonly stateKey: string;
}
export interface DispatchAction {
  readonly type: IAction;
  readonly data: any;
}
