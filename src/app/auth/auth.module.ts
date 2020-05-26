import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    declarations: [SignupComponent, SigninComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule {

}