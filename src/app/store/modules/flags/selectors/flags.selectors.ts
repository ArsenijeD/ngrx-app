import { createSelector } from '@ngrx/store';
import { AppState } from '../../../reducer/app.reducer';

export const getFlags = (state: AppState) => state.flags;

export const selectShowSearchBarProgress = createSelector(
    getFlags,
    (flags) => flags.showSearchBarProgress
);

export const isDataLoaded = createSelector(
    getFlags,
    (flags) => flags.dataLoaded
);

