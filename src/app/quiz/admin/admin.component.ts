import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';
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
    this.router.navigate(['/quiz/createquestion'],{ queryParams: { id:this.qid, code:this.code},queryParamsHandling: "merge" });
  }

  StartQ(){
    this.router.navigate(['/host/details'],{ queryParams: { id:this.qid, code:this.code,que:this.Questions.length,automated:false },queryParamsHandling: "merge" });
  }

  StartAutomated(){
    this.router.navigate(['/host/details'],{ queryParams: { id:this.qid, code:this.code,que:this.Questions.length,automated:true },queryParamsHandling: "merge" });
  }

  editQ(queid: number){
    this.router.navigate(['quiz/EditQuestion'],{ queryParams: { id:this.qid, code:this.code,qid:queid},queryParamsHandling: "merge" });
  }

  deleteQue(queid: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.restservice.DeleteQuestion(queid).subscribe((res)=>{
          Swal.fire(
            res["res"],
            'Your file has been deleted.',
            'success'
          )
        this.ngOnInit(); 
        })
      }
    })
}
}