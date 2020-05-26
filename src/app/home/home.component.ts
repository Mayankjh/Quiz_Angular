import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  JoinGameForm: FormGroup;

  constructor(private authService: AuthService,  private router: Router, private restservice: RestService) { }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  
  ngOnInit() {
    this.JoinGameForm = new FormGroup({
      'code': new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(5)])
    });
    
  }
  submitjoinG() {
    this.restservice.joingame(this.JoinGameForm.value);
  }


  host: boolean = false;
  join: boolean = false;
  home: boolean = true;
  showh() {
    if (this.isAuthenticated() == true) {
      this.host = true;
      this.home = false;
    }
    else {
      Swal.fire('Please Login to Proceed')
    }
  }
  showj() {
    if (this.isAuthenticated() == true) {
      this.join = true;
      this.home = false;
    }
    else {
      Swal.fire('Please Login to Proceed')
    }
  }
  back() {
    this.host = false;
    this.join = false;
    this.home = true;
  }
  

}
