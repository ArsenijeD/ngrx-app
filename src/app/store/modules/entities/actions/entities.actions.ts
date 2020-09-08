import { Action } from '@ngrx/store';

export const SET_ENTITIES_START = '[Entities] Set Entities Start';
export const SET_ENTITIES = '[Entities] Set Entities';
export const CHANGE_DEVELOPERS_STATUS = '[Entities] Change Developers Status';

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

export type EntitiesActions = SetEntitiesStart | SetEntities | ChangeDevelopersStatus;
