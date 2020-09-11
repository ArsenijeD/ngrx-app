import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesSelectors from './../store/modules/entities/selectors/entities.selectors';
import * as EntitiesActions from './../store/modules/entities/actions/entities.actions';
import { Commit } from '../store/schemas/commit';

@Component({
  selector: 'app-commits-graph',
  templateUrl: './commits-graph.component.html',
  styleUrls: ['./commits-graph.component.scss']
})
export class CommitsGraphComponent implements OnInit {

  activeCommits: Commit[];
  selectedCommit: Commit;

  links: any;
  nodes: any;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select(EntitiesSelectors.getActiveCommits).subscribe({next: (commits: Commit[]) => {
      this.activeCommits = commits;
      this.nodes = this.getNodes();
      this.links = this.getLinks();
    }});
    this.store.select(EntitiesSelectors.getSelectedCommit).subscribe({next: (commit: Commit) =>
      this.selectedCommit = commit
    });
  }

  onNodeActivate(event: any) {
    if (this.selectedCommit.sha) {
      this.store.dispatch(new EntitiesActions.ChangeCommitSelectedStatus({ sha: this.selectedCommit.sha }));
    }
    this.store.dispatch(new EntitiesActions.ChangeCommitSelectedStatus({ sha: event.value.name }));
  }

  getNodes(): any {
    return this.activeCommits.reverse().map((activeCommit: Commit) => {
      return {
          id: activeCommit.sha,
          label: activeCommit.sha
      };
  });
  }

  getLinks(): any {
    const links = [];
    this.activeCommits.forEach((activeCommit: Commit, i: number) => {
        activeCommit.parents.forEach((parent: string, j: number) => {
            if (this.commitParentExists(parent)) {
                links.push(
                {
                    id: '_' + i + '_' + j,
                    source: activeCommit.sha,
                    target: parent,
                    label: i + '_' + j
                });
            }
        });
    });
    return links;
  }

  commitParentExists(sha: string): boolean {
    return this.activeCommits.filter((activeCommit: Commit) => activeCommit.sha === sha).length !== 0;
}

}
