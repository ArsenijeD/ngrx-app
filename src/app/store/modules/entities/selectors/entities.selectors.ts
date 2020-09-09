import { createSelector } from '@ngrx/store';
import { AppState } from '../../../reducer/app.reducer';
import { Commit } from 'src/app/store/schemas/commit';

export const getDevelopers = (state: AppState) => state.normalized.entities.developers;
export const getCommits = (state: AppState) => state.normalized.entities.commits;
export const getResult = (state: AppState) => state.normalized.result;


export const getActiveDevelopersNames = createSelector(
    getDevelopers,
    (developers: {}) => {
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

export const getActiveCommits = createSelector(
    getCommits,
    getActiveDevelopersNames,
    (commits: {}, activeDevelopersNames: string[]) => {
        return Object.values(commits).filter((commit: any) => {
            if (!commits[commit.sha].removed && activeDevelopersNames.includes(commit.developer)) {
                return commit;
            }
        });
    }
);

export const getSelectedCommit = createSelector(
    getCommits,
    (commits: {}) => {
        const selectedCommit = Object.values(commits).find((commit: Commit) => commit.selected);
        return selectedCommit ? selectedCommit : {};
    }
);

