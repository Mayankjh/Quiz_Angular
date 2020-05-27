import { NgModule } from '@angular/core';

//imported Modules
import { PlayRoutingModule } from './play-routing.module';
import { SharedModule } from '../shared/shared.module';

// import components
import { PlayComponent } from './play.component';
import { GameComponent } from './game/game.component';



@NgModule({
  declarations: [
    PlayComponent,
    GameComponent
  ],
  imports: [
    PlayRoutingModule,
    SharedModule,
  ]
})
export class PlayModule { }
