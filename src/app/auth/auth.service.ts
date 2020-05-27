import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from '../services/config.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable()
export class AuthService {

    path = this.config.path;

    loginMsg = new Subject<any>();
    signupMsg = new Subject<any>();
    loginSpinner = new Subject<any>();
    signupSpinner = new Subject<any>();

    constructor(private http: HttpClient, private router: Router, private config: Config) {

    }

    // Login
    signin(obj) {
        this.http.post(this.path + '/users/authenticate/', obj).subscribe((res) => {
            localStorage.setItem("token", res['token']);
            localStorage.setItem("userid", res['id']);
            localStorage.setItem("FirstName", res['firstName']);
            localStorage.setItem("lastname", res['lastName']);
            localStorage.setItem("username", res['Username']);
            localStorage.setItem("email", res['email']);
            Swal.fire('Login Succesful!')
            this.router.navigate(['/home']);
        }, (err) => {
            if (err.status == 404) {
                this.loginMsg.next("User not found");
                Swal.fire("User not found")
                this.loginSpinner.next(false);
            } else if (err.status == 400) {
                this.loginMsg.next("Incorrect password");
                Swal.fire("Incorrect Password or Username")
                this.loginSpinner.next(false);
            } else {
                this.loginMsg.next("Internal server error");
                Swal.fire({
                    title: 'Internal server error',
                    text:err.status
                })
                this.loginSpinner.next(false);
            }
        });
    }

    // Signup
    signup(obj) {
        this.http.post(this.path + '/users/register', obj).subscribe((res) => {
                console.log("signup success")
                Swal.fire("Signup Successful")
                this.router.navigate(['/signin']);
        }, (err) => {
            console.log(err);
            Swal.fire({
                title: 'Some Bad request',
                text:err
            })
        });
    }

    // check token is present or not
    isAuthenticated() {
        return localStorage.getItem("token") != null;
    }

    ifusername(){
        return localStorage.getItem("email") != null;
    }

    //logout
    logout() {
        localStorage.clear();
        this.router.navigate(['/signin']);
    }
}