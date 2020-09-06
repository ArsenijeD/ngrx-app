import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesActions from '../store/entities/actions/entities.actions';
import * as FlagsActions from '../store/flags/actions/flags.actions';
import * as FlagsSelectors from '../store/flags/selectors/flags.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  gitUsername = '';
  gitRepository = '';
  showProgress: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.showProgress = this.store.select(FlagsSelectors.selectShowSearchBarProgress);
  }

  onSubmit(): void {
    this.store.dispatch(new FlagsActions.ShowSearchBarProgress());
    this.store.dispatch(new EntitiesActions.SetEntitiesStart({gitUsername: this.gitUsername, gitRepository: this.gitRepository}));
  }

}
