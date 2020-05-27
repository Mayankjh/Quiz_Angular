import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  quizdetails;
  Questions;
  quiz;
  qid;
  constructor(private authService: AuthService,  private router: Router, private restservice: RestService,private route: ActivatedRoute) { 

  }
  id: string = this.route.snapshot.queryParamMap.get('id');
  code: string = this.route.snapshot.queryParamMap.get('code');
  ngOnInit() {
    let data= this.restservice.GetAdmin(this.code).subscribe((res) => {
      console.log(res);
      this.Questions= res['questions'];
      this.quiz =res['quiz'];
      this.qid =res['quiz'].id;
      }, (err) => {
    console.log(err)
  });
  }
  CreateQ(){
    this.id = this.qid;
    this.router.navigate(['/quiz/createquestion'],{ queryParams: { id:this.id, code:this.code},queryParamsHandling: "merge" });
  }
  StartQ(){
    this.router.navigate(['/host/details'],{ queryParams: { id:this.id, code:this.code,que:this.Questions.length,automated:false },queryParamsHandling: "merge" });
  }
  StartAutomated(){
    this.router.navigate(['/host/details'],{ queryParams: { id:this.id, code:this.code,que:this.Questions.length,automated:true },queryParamsHandling: "merge" });
  }
}
