import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  id: string = this.route.snapshot.queryParamMap.get('id');
  code: string = this.route.snapshot.queryParamMap.get('code');
  Question;
  anstxt;
  Ans:boolean;
  AnswerId;
  ended:boolean;
  AnswerForm: any;
  JoinGameForm: any;
  constructor(private router: Router, private restservice: RestService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.restservice.Game(this.id).subscribe((res) => {
      console.log(res);
      this.Question = res["question"];
      if(this.AnswerId!=res["trueAnswerId"]){
      this.AnswerId = res["trueAnswerId"];
      this.Ans =false; 
      this.ngOnInit();
    }
      console.log(res["trueAnswerId"]);
      this.AnswerForm = new FormGroup({
        'answerText': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')]),
        'Id': new FormControl(this.AnswerId)
      });
      if(res["game"]=="ended"){
          this.ended = true;
      }
      setTimeout(()=>this.ngOnInit(),10000)
      }, (err) => {
    console.log(err)
  });

}
SubAns(){
  this.Ans=true;
  this.anstxt = this.AnswerForm.value.answerText;
  this.restservice.SubmitAnswer(this.AnswerForm.value);
}

Pass(){
  this.AnswerForm.value.answerText = "PASS";
  this.SubAns();
}
}
