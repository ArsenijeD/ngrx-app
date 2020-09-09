import { createSelector } from '@ngrx/store';
import { AppState } from '../../../reducer/app.reducer';
import { Developer } from 'src/app/store/schemas/developer';

export const getDevelopers = (state: AppState) => state.normalized.entities.developers;
export const getCommits = (state: AppState) => state.normalized.entities.commits;
export const getResult = (state: AppState) => state.normalized.result;


export const getActiveDevelopersNames = createSelector(
    getDevelopers,
    (developers: Developer[]) => {
        return Object.keys(developers).filter((name: string) => {
            if (!developers[name].removed) {
                return name;
            } else {
                return undefined;
            }
        });
    }
);

export const getRemovedDevelopersNames = createSelector(
    getDevelopers,
    (developers: {}) => {
        return Object.keys(developers).filter((name: string) => {
            if (developers[name].removed) {
                return name;
            } else {
                return undefined;
            }
        });
    }
);

export const getCommitsPerActiveDevelopers = createSelector(
    getActiveDevelopersNames,
    getCommits,
    getResult,
    (activeDevelopersNames: string[], commits: {}, result: string[]) => {
        // eslint-disable-next-line
        const commitsPerActiveDevelopers = activeDevelopersNames.reduce((a, b) => (a[b] = 0, a), {});
        activeDevelopersNames.forEach((activeDevelopersName: string) => {
            result.forEach((sha: string) => {
                if (commits[sha].developer === activeDevelopersName) {
                    commitsPerActiveDevelopers[activeDevelopersName] += 1;
                }
            });
        });
        return commitsPerActiveDevelopers;
    }
);

