import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { normalize } from 'normalizr';

import * as EntitiesActions from '../actions/entities.actions';
import * as FlagsActions from '../../flags/actions/flags.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class EntitiesEffects {

    private baseUrl = 'https://api.github.com/';

    constructor(private actions$: Actions, private http: HttpClient) {}

    @Effect()
    setEntities = this.actions$.pipe(
        ofType(EntitiesActions.SET_ENTITIES_START),
        switchMap((setEntitiesAction: EntitiesActions.SetEntitiesStart) => {
            return this.http.get(this.baseUrl + 'repos/' +
                setEntitiesAction.payload.gitUsername + '/' + setEntitiesAction.payload.gitRepository + '/commits')
            .pipe(
                mergeMap((response: any) => [
                    new EntitiesActions.SetEntities(response),
                    new FlagsActions.SetDataLoaded(),
                    new FlagsActions.ShowSearchBarProgress()
                ]),
                catchError((error: HttpErrorResponse) => {
                    // TODO: Handle this
                    return of(new FlagsActions.ShowSearchBarProgress());
                })
            );
        })
    );

}