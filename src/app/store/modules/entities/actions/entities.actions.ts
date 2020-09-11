import { Action } from '@ngrx/store';

export const SET_ENTITIES_START = '[Entities] Set Entities Start';
export const SET_ENTITIES = '[Entities] Set Entities';
export const CHANGE_DEVELOPERS_STATUS = '[Entities] Change Developers Status';
export const CHANGE_COMMIT_SELECTED_STATUS = '[Entities] Change Commit Selected Status';
export const CHANGE_COMMITS_DEVELOPER = '[Entities] Change Commits Developer';
export const ADD_PARENT = '[Entities] Add Parent';
export const REMOVE_PARENT = '[Entities] Remove Parent';
export const SET_COMMIT_AS_REMOVED = '[Entities] Set Commit As Removed';

export class SetEntitiesStart implements Action {
  readonly type = SET_ENTITIES_START;

  constructor(public payload: { gitUsername: string; gitRepository: string }) {}
}

export class SetEntities implements Action {
  readonly type = SET_ENTITIES;

  constructor(public payload: any) {}
}

export class ChangeDevelopersStatus implements Action {
  readonly type = CHANGE_DEVELOPERS_STATUS;

  constructor(public payload: { developersName: string }) {}
}

export class ChangeCommitSelectedStatus implements Action {
  readonly type = CHANGE_COMMIT_SELECTED_STATUS;

  constructor(public payload: { sha: string }) {}
}

export class ChangeCommitsDeveloper implements Action {
  readonly type = CHANGE_COMMITS_DEVELOPER;

  constructor(public payload: { newDeveloper: string, sha: string }) {}
}

export class AddParent implements Action {
  readonly type = ADD_PARENT;

  constructor(public payload: { commitSha: string, newParentSha: string }) {}
}

export class RemoveParent implements Action {
  readonly type = REMOVE_PARENT;

  constructor(public payload: { commitSha: string, oldParentSha: string }) {}
}

export class SetCommitAsRemoved implements Action {
  readonly type = SET_COMMIT_AS_REMOVED;

  constructor(public payload: { sha: string}) {}
}

export type EntitiesActions = SetEntitiesStart | SetEntities | ChangeDevelopersStatus |
            ChangeCommitSelectedStatus | ChangeCommitsDeveloper | AddParent | RemoveParent |
            SetCommitAsRemoved;
