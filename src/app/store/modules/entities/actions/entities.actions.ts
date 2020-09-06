import { Action } from '@ngrx/store';


export const SET_ENTITIES_START = '[Entities] Set Entities Start';

export class SetEntitiesStart implements Action {
  readonly type = SET_ENTITIES_START;

  constructor(public payload: { gitUsername: string; gitRepository: string }) {}
}

export type EntitiesActions = SetEntitiesStart;
