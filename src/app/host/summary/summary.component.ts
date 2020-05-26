import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/rest.service';

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

  constructor(private router: Router, private restservice: RestService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.restservice.getQuizSummary(this.code).subscribe((res) => {
      console.log(res);
      this.Answers= res['answers'];
      this.Questions= res['questions'];
      this.quiz =res['quiz'];
    }, (err) => {
    console.log(err)
  });
  }

}
