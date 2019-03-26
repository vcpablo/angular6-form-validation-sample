import { AbstractControl, ValidationErrors, Validator, NgModel, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fieldmatches]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FieldmatchesDirective, multi: true }
  ]
})
export class FieldmatchesDirective implements Validator {

  @Input('name')
  name: string;
  @Input('fieldmatches')
  fieldmatches: NgModel;

  constructor() { }

  public validate(c: AbstractControl): ValidationErrors | null {
    let isValid = false;
    let result;

    if(!this.fieldmatches) {
      let pattern;

      switch(this.name) {
        case 'password':
          pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
          break;
        case 'email':
          pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;
        case 'phoneNumber':
          pattern = /^\([1-9][0-9][0-9]\)\ \d{3}-\d{4}$/;
          break;
      }
        
      if(pattern) {
        isValid = pattern.test(String(c.value));
        result = { 'pattern': true };
      }
    } else {
      isValid = c.value === this.fieldmatches.control.value;
      result = { 'password_match': true };
    }
    
    return (isValid) ? null :  result;
  }

  public registerOnValidatorChange(fn: () => void): void {

  }
}
