import { Action } from '@ngrx/store';


export const SET_DATA_LOADED = '[Flags] Set Data Loaded';
export const SHOW_SEARCH_BAR_PROGRESS = '[Flags] Show Search Bar Progress';


export class SetDataLoaded implements Action {
  readonly type = SET_DATA_LOADED;
}

export class ShowSearchBarProgress implements Action {
  readonly type = SHOW_SEARCH_BAR_PROGRESS;
}

export type FlagsActions = SetDataLoaded | ShowSearchBarProgress;
