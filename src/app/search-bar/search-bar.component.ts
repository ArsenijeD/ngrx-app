import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesActions from '../store/modules/entities/actions/entities.actions';
import * as FlagsActions from '../store/modules/flags/actions/flags.actions';
import * as FlagsSelectors from '../store/modules/flags/selectors/flags.selectors';

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
