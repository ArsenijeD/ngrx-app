import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { EntitiesEffects } from './store/modules/entities/effects/entities.effects';
import * as fromApp from './store/reducer/app.reducer';
import { environment } from 'src/environments/environment';
import { DevelopersListComponent } from './developers-list/developers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DevelopersListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([EntitiesEffects]),
    HttpClientModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
