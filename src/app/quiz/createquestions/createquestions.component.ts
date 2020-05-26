import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createquestions',
  templateUrl: './createquestions.component.html',
  styleUrls: ['./createquestions.component.css']
})
export class CreatequestionsComponent implements OnInit {
  CreateQuestion: FormGroup;

  constructor(private authService: AuthService,  private router: Router, private restservice: RestService, private route:ActivatedRoute) { }
QuizId;
  ngOnInit() {
    const id: string = this.route.snapshot.queryParamMap.get('id');
    this.QuizId = id;
    this.CreateQuestion = new FormGroup({
      'QuestionText': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')]),
      'AnswerText': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')]),
      'QuizId': new FormControl(parseInt(id)),

    });
  }
  CreateQue() {
    // console.log(this.CreateQuiz.value)
    this.restservice.CreateQuestion(this.CreateQuestion.value);
    this.CreateQuestion.reset();
    this.ngOnInit();
  }

  getAdmin(){
    this.router.navigate(['/quiz/admin'],{ queryParams: { id:this.QuizId},queryParamsHandling: "merge" });
  }

}
