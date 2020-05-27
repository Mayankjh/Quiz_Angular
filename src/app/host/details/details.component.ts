import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  code: string = this.route.snapshot.queryParamMap.get('code');
  NoQue = this.route.snapshot.queryParamMap.get('que');
  automated= this.route.snapshot.queryParamMap.get('automated');
  Question;
  Answers;
  timeLeft: number = 80;
  interval;
  constructor(private router: Router, private restservice: RestService,private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.startQuiz();
    if(this.automated=='true'){
      this.timeLeft = 80;
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
        this.GetNextQuestion()
      }
    },1000)
  }

  GetNextQuestion(){
    this.restservice.getNxtQue(this.code).subscribe((res) => {
      console.log(res);
      if(res["res"]=="ended"){
        // Swal.fire("Quiz ended Taking you to summary");
        this.router.navigate(['/host/quiz/summary'],{ queryParams: {code:this.code },queryParamsHandling: "merge" });
      }
      if(res["res"]!="ended"){
      this.ngOnInit();
    }
    }, (err) => {
    console.log(err)
  });
  }

  startQuiz(){
    this.restservice.StartQuiz(this.code,this.automated).subscribe((res) => {
      if(res["res"]=="ended"){
        this.router.navigate(['/host/quiz/summary'],{ queryParams: {code:this.code },queryParamsHandling: "merge" });
      }
      console.log(res);
      if(res["res"]!="ended"){
        this.Question = res["vm"]["question"];
        this.Answers = res["vm"]["answers"];
        setTimeout(()=>this.startQuiz(),8000);
      } 
      }, (err) => {
    console.log(err);
  });
  }

}
