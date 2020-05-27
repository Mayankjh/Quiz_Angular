import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//imported components
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path:'quiz', loadChildren:'./quiz/quiz.module#QuizModule'},
  {path:'host', loadChildren:'./host/host.module#HostModule'},
  {path:'play', loadChildren:'./play/play.module#PlayModule'},
  // {path: '**',redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
