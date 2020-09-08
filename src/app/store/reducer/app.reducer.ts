import { ActionReducerMap } from '@ngrx/store';

import * as fromFlags from './../modules/flags/reducer/flags.reducer';
import * as fromEntities from './../modules/entities/reducer/entities.reducer';

export interface AppState {
  normalized: fromEntities.State;
  flags: fromFlags.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    normalized: fromEntities.entitiesReducer,
    flags: fromFlags.flagsReducer
};
