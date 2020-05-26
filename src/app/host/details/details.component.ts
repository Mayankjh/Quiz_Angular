import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // id: string = this.route.snapshot.queryParamMap.get('id');
  code: string = this.route.snapshot.queryParamMap.get('code');
  Question;
  Answers;

  constructor(private router: Router, private restservice: RestService,private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.startQuiz();
  }
  GetNextQuestion(){
    this.restservice.getNxtQue(this.code).subscribe((res) => {
      console.log(res);
      if(res["res"]=="ended"){
        // Swal.fire("Quiz ended Taking you to summary");
        this.router.navigate(['/quiz/summary'],{ queryParams: {code:this.code },queryParamsHandling: "merge" });

      }
      if(res["res"]!="ended"){
      this.ngOnInit();
    }
    }, (err) => {
    console.log(err)
  });
  }

  startQuiz(){
    this.restservice.StartQuiz(this.code).subscribe((res) => {
      if(res["res"]=="ended"){
        Swal.fire("Quiz ended Taking you to summary");
        this.router.navigate(['/quiz/summary'],{ queryParams: {code:this.code },queryParamsHandling: "merge" });
      }
      console.log(res);
      if(res["res"]!="ended"){
        this.Question = res["question"];
        this.Answers = res["answers"];
        setTimeout(()=>this.startQuiz(),8000);
      } 
      }, (err) => {
    console.log(err);
    // Swal.fire("Some Error occured");
    // this.router.navigate(['/host']);

  });
  }

}
