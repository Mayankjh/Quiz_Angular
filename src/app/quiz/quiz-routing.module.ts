import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//imported components
import { CreateComponent } from './create/create.component';
import { CreatequestionsComponent } from './createquestions/createquestions.component';
import { AdminComponent } from './admin/admin.component';

// services
import { AuthGuard } from '../auth/auth-guard.service';



const routes: Routes = [
  
  {path: 'create',component:CreateComponent,canActivate: [AuthGuard]},
  {path: 'createquestion',component:CreatequestionsComponent,canActivate: [AuthGuard]},
  {path: 'admin',component:AdminComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
