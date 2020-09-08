import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesSelectrs from './../store/modules/entities/selectors/entities.selectors';
import * as EntitiesActions from '../store/modules/entities/actions/entities.actions';

@Component({
  selector: 'app-developers-list',
  templateUrl: './developers-list.component.html',
  styleUrls: ['./developers-list.component.scss']
})
export class DevelopersListComponent implements OnInit {

  activeDevelopersNames: Observable<string[]>;
  removedDevelopersNames: Observable<string[]>;
  showActiveDevelopers: boolean;
  showRemovedDevelopers: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.activeDevelopersNames = this.store.select(EntitiesSelectrs.getActiveDevelopersNames);
    this.removedDevelopersNames = this.store.select(EntitiesSelectrs.getRemovedDevelopersNames);
    this.activeDevelopersNames.subscribe({next: (names: string[]) => {
      this.showActiveDevelopers = names.length !== 0;
    }});
    this.removedDevelopersNames.subscribe({next: (names: string[]) => {
      this.showRemovedDevelopers = names.length !== 0;
    }});
  }

  onDeveloperClick(developersName: string): void {
    this.store.dispatch(new EntitiesActions.ChangeDevelopersStatus({developersName}));
  }

}
