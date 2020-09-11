import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesSelectors from './../store/modules/entities/selectors/entities.selectors';
import * as EntitiesActions from '../store/modules/entities/actions/entities.actions';
import { Commit } from '../store/schemas/commit';

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
  selectedCommit: any;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.activeDevelopersNames = this.store.select(EntitiesSelectors.getActiveDevelopersNames);
    this.removedDevelopersNames = this.store.select(EntitiesSelectors.getRemovedDevelopersNames);
    this.activeDevelopersNames.subscribe({next: (names: string[]) => {
      this.showActiveDevelopers = names.length !== 0;
    }});
    this.removedDevelopersNames.subscribe({next: (names: string[]) => {
      this.showRemovedDevelopers = names.length !== 0;
    }});
    this.store.select(EntitiesSelectors.getSelectedCommit).subscribe({next: (commit: any) => {
      this.selectedCommit = commit;
    }});
  }

  onDeveloperClick(developersName: string): void {
    if (developersName === this.selectedCommit.developer) {
      this.store.dispatch(new EntitiesActions.ChangeCommitSelectedStatus({sha: this.selectedCommit.sha}));
  }
    this.store.dispatch(new EntitiesActions.ChangeDevelopersStatus({developersName}));
  }

}
