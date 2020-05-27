import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  msg = null;
  spinner = false;
  signUpForm: FormGroup;
  Vendors;
  Plans;
  constructor(private authService: AuthService,private RestService: RestService) { }
  submit() {
    this.authService.signup(this.signUpForm.value);
    this.spinner = true;
  }
  ngOnInit() {

    this.signUpForm = new FormGroup({
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "username": new FormControl(null, [Validators.required,Validators.minLength(6)]),
      "password": new FormControl(null, [Validators.required,Validators.minLength(8)]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
    });

    this.authService.signupMsg.subscribe((res) => {
      this.msg = res;
    });

    this.authService.signupSpinner.subscribe((res) => {
      this.spinner = res;
    });
  }
}
