import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Commit } from '../store/schemas/commit';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesSelectors from './../store/modules/entities/selectors/entities.selectors';
import * as EntitiesActions from './../store/modules/entities/actions/entities.actions';

@Component({
  selector: 'app-commit-form',
  templateUrl: './commit-form.component.html',
  styleUrls: ['./commit-form.component.scss']
})
export class CommitFormComponent implements OnInit {

  selectedCommit: Commit;
  activeDevelopersNames: string[];
  nonParents: string[];
  formDisabled: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select(EntitiesSelectors.getSelectedCommit).subscribe({next: (commit: Commit) => {
      this.selectedCommit = commit;
      this.formDisabled = !this.selectedCommit.sha;
    }});
    this.store.select(EntitiesSelectors.getActiveDevelopersNames).subscribe({next: (names: string[]) => {
      this.activeDevelopersNames = names;
    }});
    this.store.select(EntitiesSelectors.getNonParentsForSelectedCommit).subscribe({next: (nonParents: string[]) => {
      this.nonParents = nonParents;
    }});
  }

  onDeveloperChange(newDeveloper: string): void {
    this.store.dispatch(new EntitiesActions.ChangeCommitsDeveloper({newDeveloper, sha: this.selectedCommit.sha}));
  }

  onParentClick(nonParentSha: string): void {
    this.store.dispatch(new EntitiesActions.RemoveParent({commitSha: this.selectedCommit.sha, oldParentSha: nonParentSha}));
  }

  onNonParentClick(parentSha: string): void {
    this.store.dispatch(new EntitiesActions.AddParent({commitSha: this.selectedCommit.sha, newParentSha: parentSha}));
  }

  onRemoveClick(): void {
    this.store.dispatch(new EntitiesActions.SetCommitAsRemoved({sha: this.selectedCommit.sha}));
  }

}
