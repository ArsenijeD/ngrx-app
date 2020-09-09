import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from './store/reducer/app.reducer';
import * as FlagsSelectors from './store/modules/flags/selectors/flags.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isDataLoaded: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.isDataLoaded = this.store.select(FlagsSelectors.isDataLoaded);
  }
}
