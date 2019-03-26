import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupDetailsComponent } from './components/signup-details/signup-details.component';
import { FieldmatchesDirective } from './validators/fieldmatches.directive';
import { RouterModule, Routes } from '@angular/router';

enum RoutePaths {
  SignupForm = 'signup-form',
  SignupDetails = 'signup-details',
}

export const appRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    redirectTo: RoutePaths.SignupForm,
    pathMatch: 'full'
  }, {
    path: RoutePaths.SignupForm,
    component: SignupFormComponent
  }, {
    path: RoutePaths.SignupDetails,
    component: SignupDetailsComponent
  }]
}];

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    SignupDetailsComponent,
    FieldmatchesDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
