import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup , Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { SignupService } from '../../services/signup.service';
import { SignupData } from '../../models/signup-data.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Output()
  save = new EventEmitter<SignupData>();
  countries: Array<Country>;
  states: Array<State>;

  signUpForm: FormGroup;
  submitted: boolean = false;

  constructor(private countriesService: CountriesService, private signupService: SignupService, private router: Router, public formBuilder: FormBuilder) {
  }

  submit(form: NgForm) {
    this.submitted = true
    
    if(form.invalid) {
      return;
    }
    
    let data = form.value;
    data.country = this.getCountryName(data.country).name;
    data.state = this.getStateName(data.state).name;

    this.save.emit(data);
    
    this.signupService.saveData(data).subscribe((res: any) => {
      this.router.navigateByUrl('/signup-details');
    });
  }

  ngOnInit() {
    this.configureForm();
    this.loadCountries();
  }

  private configureForm() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [ Validators.required ]],
      email: ['', [ Validators.required, Validators.email ]],
      password: new FormControl(['', [ Validators.required, Validators.pattern('^(?=[a-zA-Z0-9#@$?]{8,}$)(?=.*?[A-Z]).*')]]),
      password_match: ['', [ Validators.required ]],
      phoneNumber: ['', [ Validators.required ]],
      country: ['', [ Validators.required]],
      state: ['', [ Validators.required]]
    });
  }

  private loadCountries() {
    this.countriesService.getCountries().subscribe((res: Array<Country>) => {
      this.countries = res;
    });
  }

  private loadStateByCountryId(countryId) {
    this.countriesService.getStates(parseInt(countryId)).subscribe((res: Array<State>) => {
      this.states = res;
    });
  }
  

  private getCountryName(countryId) {
    return this.countries.find(country => {
      return country.id === parseInt(countryId);
    });
  }

  private getStateName(stateId) {
    return this.states.find(state => {
      return state.id === parseInt(stateId);
    });
  }
}
