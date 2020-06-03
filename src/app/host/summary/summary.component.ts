import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  code: string = this.route.snapshot.queryParamMap.get('code');
  Questions: any;
  quiz: any;
  Answers: any;
  users={}
  constructor(private router: Router, private restservice: RestService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.restservice.getQuizSummary(this.code).subscribe((res) => {
      console.log(res);
      this.Answers= res['answers'];
      this.Questions= res['questions'];
      this.quiz =res['quiz'];
      this.getuserscores();
    }, (err) => {
    console.log(err)
  });
  }

  // calculate user scores
  getuserscores(){
    var total =this.Questions.length;
    for(let que of this.Questions){
      for(let ans of this.Answers){
        if(que.id==ans.question.id){ //checks if same question
          if(que.id==ans.questionId && ans.answerText!=null){ //checks if answer is not null
            if(ans.userId in this.users && que.answerText.toLowerCase()==ans.answerText.toLowerCase()){ //checks if correct answer and user already present
              this.users[ans.userId]++; //increments score
            }
            else if(!(ans.userId in this.users) && que.answerText.toLowerCase()==ans.answerText.toLowerCase()) { //
              this.users[ans.userId]=1;
            }
            else if(!(ans.userId in this.users) && que.answerText.toLowerCase()!=ans.answerText.toLowerCase()){
              this.users[ans.userId]=0;
            }
          }
        }
      }
    }
  }
  
}
