import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { Config } from './config.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';
import { PlayComponent } from './play/play.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizsComponent } from './quizs/quizs.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DetailsComponent } from './host/details/details.component';
import { SummaryComponent } from './host/summary/summary.component';
import { AdminComponent } from './quiz/admin/admin.component';
import { CreateComponent } from './quiz/create/create.component';
import { CreatequestionsComponent } from './quiz/createquestions/createquestions.component';
import { GameComponent } from './play/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HostComponent,
    PlayComponent,
    QuizComponent,
    QuizsComponent,
    NavComponent,
    FooterComponent,
    DetailsComponent,
    SummaryComponent,
    AdminComponent,
    CreateComponent,
    CreatequestionsComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    NgxPaginationModule
  ],
  providers: [ 
    AuthService,
    AuthGuard,
    Config,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
