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
        case EntitiesActions.CHANGE_COMMIT_SELECTED_STATUS:
            return {
                ...state,
                entities: {
                    commits: {
                        ...state.entities.commits,
                        [action.payload.sha]: {
                            ...state.entities.commits[action.payload.sha],
                            selected: !state.entities.commits[action.payload.sha].selected
                        }
                    },
                    developers: {...state.entities.developers}
                },
            };
        case EntitiesActions.CHANGE_COMMITS_DEVELOPER:
            return {
                ...state,
                entities: {
                    commits: {
                        ...state.entities.commits,
                        [action.payload.sha]: {
                            ...state.entities.commits[action.payload.sha],
                            developer: action.payload.newDeveloper
                        }
                    },
                    developers: {...state.entities.developers}
                }
            };
        case EntitiesActions.ADD_PARENT:
            return {
                ...state,
                entities: {
                    commits: {
                        ...state.entities.commits,
                        [action.payload.commitSha]: {
                            ...state.entities.commits[action.payload.commitSha],
                            parents: [...state.entities.commits[action.payload.commitSha].parents, action.payload.newParentSha]
                        }
                    },
                    developers: {...state.entities.developers}
                }
            };
        case EntitiesActions.REMOVE_PARENT:
            const index = state.entities.commits[action.payload.commitSha].parents.indexOf(action.payload.oldParentSha);
            return {
                ...state,
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload.commitSha]: {
                            ...state.entities.commits[action.payload.commitSha],
                            parents: [...state.entities.commits[action.payload.commitSha].parents.slice(0, index),
                                        ...state.entities.commits[action.payload.commitSha].parents.slice(index + 1)]
                        }
                    },
                    developers: {...state.entities.developers}
                }
            };
        case EntitiesActions.SET_COMMIT_AS_REMOVED:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    commits: {
                        ...state.entities.commits,
                        [action.payload.sha]: {
                            ...state.entities.commits[action.payload.sha],
                            removed: true
                        }
                    },
                    developers: {...state.entities.developers}
                }
            };
        default:
            return state;
    }

}

