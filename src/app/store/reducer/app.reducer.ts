import { ActionReducerMap } from '@ngrx/store';

import * as fromFlags from './../modules/flags/reducer/flags.reducer';
import { NormalizedState, normalized } from 'ngrx-normalizr';

export interface AppState extends NormalizedState {
  flags: fromFlags.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    normalized,
    // Entities reducer removed because entities are directly mapped on normalized slice of a state
    flags: fromFlags.flagsReducer
};
