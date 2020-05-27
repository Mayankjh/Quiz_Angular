import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//imported components
import { DetailsComponent } from './details/details.component';
import { HostComponent } from './host.component';
import { SummaryComponent } from './summary/summary.component';

// services
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
  {path: 'details',component:DetailsComponent,canActivate: [AuthGuard]},
  {path: '',component:HostComponent,canActivate: [AuthGuard]},
  {path: 'quiz/summary',component:SummaryComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
