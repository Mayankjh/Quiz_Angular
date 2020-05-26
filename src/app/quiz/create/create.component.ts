import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  CreateQuiz: any;

  constructor(private authService: AuthService,  private router: Router, private restservice: RestService) { }

  ngOnInit() {
    this.CreateQuiz = new FormGroup({
      'Title': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')])
    });
  }
  CreateQ() {
    // console.log(this.CreateQuiz.value)
    this.restservice.CreateQuiz(this.CreateQuiz.value);
  }
}
