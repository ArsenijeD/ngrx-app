import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducer/app.reducer';

export const selectFlags = (state: AppState) => state.flags;

export const selectShowSearchBarProgress = createSelector(
    selectFlags,
    (flags) => flags.showSearchBarProgress
);

