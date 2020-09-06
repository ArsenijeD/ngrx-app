import { Developer } from './developer';

export class Commit {
    removed: boolean;
    selected: boolean;

    constructor(public sha: string, public parents: string[], public message: string, public date: Date, public developer: Developer) {
        this.removed = false;
        this.selected = false;
    }
}
