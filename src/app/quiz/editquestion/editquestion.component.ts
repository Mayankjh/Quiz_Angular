import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {
  EditQuestion: FormGroup;

  constructor(private authService: AuthService,  private router: Router, private restservice: RestService, private route:ActivatedRoute) { }
QId;
QzId;
Qtext;
Atext;
  ngOnInit() {
    const id: string = this.route.snapshot.queryParamMap.get('id');
    const qid: string = this.route.snapshot.queryParamMap.get('qid');
      //get prev que values
      this.restservice.QueById(qid).subscribe((res)=>{
        console.log(res);
        this.Qtext = res["questionText"]
        this.Atext = res["answerText"]
        this.QzId = id
      })
    this.QId = qid;
    this.EditQuestion = new FormGroup({
      'questionText': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z0-9][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')]),
      'answerText': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z0-9][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')]),
      'id': new FormControl(parseInt(this.QId)),
      'quizId': new FormControl(parseInt(id))

    });
  }
  EditQue() {
    this.restservice.EditQuestion(this.EditQuestion.value,parseInt(this.QId),this.QzId);
  }

  getAdmin(){
    this.router.navigate(['/quiz/admin'],{ queryParams: { id:this.QzId},queryParamsHandling: "merge" });
  }

}
