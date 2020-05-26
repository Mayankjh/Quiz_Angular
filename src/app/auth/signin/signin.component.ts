import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  msg = null;
  spinner = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, Validators.required)
    });

    this.authService.loginMsg.subscribe((res) => {
      this.msg = res;
    });

    this.authService.loginSpinner.subscribe((res) => {
      this.spinner = res;
    });
  }

  submit() {
    this.authService.signin(this.loginForm.value);
    this.spinner = true;
  }
}
