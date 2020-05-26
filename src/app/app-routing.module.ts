import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PlayComponent } from './play/play.component';
import { GameComponent } from './play/game/game.component';
import { QuizComponent } from './quiz/quiz.component';
import { CreateComponent } from './quiz/create/create.component';
import { CreatequestionsComponent } from './quiz/createquestions/createquestions.component';
import { AdminComponent } from './quiz/admin/admin.component';
import { DetailsComponent } from './host/details/details.component';
import { HostComponent } from './host/host.component';
import { SummaryComponent } from './host/summary/summary.component';
import { AuthGuard } from './auth/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {path: 'signin',component:SigninComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'play',component:PlayComponent,canActivate: [AuthGuard]},
  {path: 'quiz/create',component:CreateComponent,canActivate: [AuthGuard]},
  {path: 'quiz/createquestion',component:CreatequestionsComponent,canActivate: [AuthGuard]},
  {path:'play/game',component:GameComponent,canActivate: [AuthGuard]},
  {path:'quiz/admin',component:AdminComponent,canActivate: [AuthGuard]},
  {path:'host/details',component:DetailsComponent,canActivate: [AuthGuard]},
  {path:'host',component:HostComponent,canActivate: [AuthGuard]},
  {path:'quiz/summary',component:SummaryComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
