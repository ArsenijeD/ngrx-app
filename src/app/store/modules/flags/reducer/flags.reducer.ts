import * as FlagsActions from '../actions/flags.actions';

export interface State {
    dataLoaded: boolean;
    showSearchBarProgress: boolean;
}

const initialState: State = {
    dataLoaded: false,
    showSearchBarProgress: false
};

export function flagsReducer(state: State = initialState, action: FlagsActions.FlagsActions): State {

    switch (action.type) {
        case FlagsActions.SET_DATA_LOADED:
            return {
                ...state,
                dataLoaded: true
            };
        case FlagsActions.SHOW_SEARCH_BAR_PROGRESS:
            return {
                ...state,
                showSearchBarProgress: !state.showSearchBarProgress
            };
        default:
            return state;
    }

}

