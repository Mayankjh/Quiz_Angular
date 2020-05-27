import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//imported components
import { PlayComponent } from './play.component';
import { GameComponent } from './game/game.component';

// services
import { AuthGuard } from '../auth/auth-guard.service';


const routes: Routes = [
  {path: '',component:PlayComponent,canActivate: [AuthGuard]},
  {path: 'game',component:GameComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
