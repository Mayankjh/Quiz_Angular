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
  automated= this.route.snapshot.queryParamMap.get('automated');
  Question;
  anstxt;
  Ans:boolean;
  AnswerId;
  ended:boolean=false;
  AnswerForm: any;
  JoinGameForm: any;
  timeLeft: number = 60;
  interval;
  constructor(private router: Router, private restservice: RestService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.restservice.Game(this.id).subscribe((res) => {
      console.log(res);
      this.Question = res["question"];
      if(this.AnswerId!=res["trueAnswerId"]){
      this.AnswerId = res["trueAnswerId"];
      this.Ans =false;
      this.timeLeft = 60; 
      this.ngOnInit();
    }
      console.log(res["trueAnswerId"]);
      this.AnswerForm = new FormGroup({
        'answerText': new FormControl(null, [Validators.required,Validators.pattern('^[A-Za-z0-9][A-Za-z0-9$&+,:;=?@#|<>.^*()%! -]*')]),
        'Id': new FormControl(this.AnswerId)
      });
      if(res["game"]=="ended"){
          this.ended = true;
          clearInterval(this.interval);
      }
      setTimeout(()=>this.ngOnInit(),10000)
      }, (err) => {
    console.log(err)
  });

  if(this.automated=='true'){
    clearInterval(this.interval);
    this.startTimer();
  }
}

startTimer() {
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    }
    else {
      clearInterval(this.interval);
      this.timeLeft = 60;
      if(this.Ans==false){
        this.Pass();
      }
    }
  },1000)
}


SubAns(){
  this.Ans=true;
  this.anstxt = this.AnswerForm.value.answerText;
  this.restservice.SubmitAnswer(this.AnswerForm.value);
  clearInterval(this.interval);
}

Pass(){
  this.AnswerForm.value.answerText = "PASS";
  this.SubAns();
  clearInterval(this.interval);
}
}
