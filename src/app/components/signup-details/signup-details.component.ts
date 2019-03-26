import { Component, OnInit } from '@angular/core';
import { SignupData } from '../../models/signup-data.model';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
    selector: 'signup-details',
    templateUrl: './signup-details.component.html'
})
export class SignupDetailsComponent implements OnInit {
    data: SignupData;

    constructor(private signupService: SignupService, private router: Router) {

    }

    ngOnInit() {
      this.signupService.getData().subscribe((res: SignupData) => {
        this.data = res;

        if(!this.data) {
          this.back();
        }
      });
    }

    back() {
      this.router.navigateByUrl('/signup-form');
    }
}
