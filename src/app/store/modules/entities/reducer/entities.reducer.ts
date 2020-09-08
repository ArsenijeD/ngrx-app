import { normalize } from 'normalizr';

import * as EntitiesActions from '../actions/entities.actions';
import { commitCollectionSchema } from 'src/app/store/schemas/commits.schema';

export interface State {
    entities: {
        commits: {},
        developers: {}
    };
    result: string[];
}

const initialState: State = {
    entities: {
        commits: {},
        developers: {}
    },
    result: []
};

export function entitiesReducer(state: State = initialState, action: EntitiesActions.EntitiesActions): State {

    switch (action.type) {
        case EntitiesActions.SET_ENTITIES:
            const normalizedData = normalize(action.payload, commitCollectionSchema);
            return {
                ...state,
                entities: {
                    developers: normalizedData.entities.developers,
                    commits: normalizedData.entities.commits
                },
                result: normalizedData.result
            };
        case EntitiesActions.CHANGE_DEVELOPERS_STATUS:
            return {
                ...state,
                entities: {
                    developers: {
                        ...state.entities.developers,
                        [action.payload.developersName]: {
                            ...state.entities.developers[action.payload.developersName],
                            removed: !state.entities.developers[action.payload.developersName].removed
                        }
                    },
                    commits: {...state.entities.commits}
                },
            };
        default:
            return state;
    }

}

