import { NgModule } from '@angular/core';


//imported modules
import { QuizRoutingModule } from './quiz-routing.module'
import { SharedModule } from '../shared/shared.module';


// imported components
import { AdminComponent } from './admin/admin.component';
import { CreateComponent } from './create/create.component';
import { CreatequestionsComponent } from './createquestions/createquestions.component';
import { EditquestionComponent } from './editquestion/editquestion.component';



@NgModule({
  declarations: [
    AdminComponent,
    CreateComponent,
    CreatequestionsComponent,
    EditquestionComponent
  ],
  imports: [
    QuizRoutingModule,
    SharedModule
  ],
  exports: [
  ]

})
export class QuizModule { }
