import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, async, inject, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { appRoutes } from './app.module';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupDetailsComponent } from './components/signup-details/signup-details.component';
import { AbstractControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FieldmatchesDirective } from './validators/fieldmatches.directive';

@Component({
  template: ''
})
class RoutingComponent { }

describe('Routing', () => {
  let location, router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      declarations: [
        RoutingComponent,
        SignupFormComponent,
        SignupDetailsComponent,
        FieldmatchesDirective
      ]
    });
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it(`navigate to '' takes you to /signup-form`, async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    fixture.ngZone.run(() => router.navigate(['']))
      .then(() => {
        expect(location.path()).toBe('/signup-form');
      });
  }));

  it(`navigate to 'signup-details' takes you to /signup-details`, async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    fixture.detectChanges();
    fixture.ngZone.run(() => router.navigate(['signup-details']))
      .then(() => {
        expect(location.path()).toBe('/signup-details');
      });
  }));
});
