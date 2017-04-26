import { IAction } from './interfaces.d';

export const LoadingAction: IAction = {
  stateKey: "loading"
}
export const SearchAction: IAction = {
  stateKey: "searchState"
}
export const ResultsAction: IAction = {
  stateKey: "results"
}
export const LocationAction: IAction = {
  stateKey: "location"
}
export type Action = IAction;
