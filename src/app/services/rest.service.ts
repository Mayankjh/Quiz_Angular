import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Config } from './config.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

const endpoint = 'https://localhost:44318/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private route:ActivatedRoute,private http: HttpClient, private router: Router) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // Join game
  joingame(obj) {
    this.http.get(endpoint + 'api/Play/JoinGame/'+obj.code).subscribe((res) => {
            console.log("Quiz found",res)
            if(res["res"]=="NotStarted"){
              Swal.fire("Success! Quiz not started Taking you to waiting area...");
              this.router.navigate(['/play'],{ queryParams: { id: obj.code },queryParamsHandling: "merge" });
            }
            if(res["res"]=="GetGame"){
              Swal.fire("Success Join success Taking you to Game Play Zone!");
              this.router.navigate(['/play/game'],{ queryParams: { id: obj.code },queryParamsHandling: "merge" });
            }   
    }, (err) => {
        console.log(err);
        Swal.fire({
            title: err.status,
            text:err["title"]
        })
    });
}

//check gamestatus
CheckGameStatus(code) {
  this.http.get(endpoint + 'api/Play/JoinGame/'+code).subscribe((res) => {
          if(res["res"]=="GetGame"){
            // Swal.fire("Success Join success Taking you to Game Play Zone!");
            this.router.navigate(['/play/game'],{ queryParams: { id: code },queryParamsHandling: "merge" });
          }
  }, (err) => {
      console.log(err);
  });
}

//create quiz
CreateQuiz(obj) {
  console.log(obj)
  this.http.post(endpoint + 'api/Quiz/create',obj).subscribe((res) => {
          Swal.fire("Success");
          this.router.navigate(['/quiz/createquestion'],{ queryParams: { id:res["id"], code:res["code"] },queryParamsHandling: "merge" });
  }, (err) => {
      console.log(err);
      Swal.fire({
        title: err.status,
        text:err["title"]})
  });
}

//create question
CreateQuestion(obj) {
  console.log(obj)
  this.http.post(endpoint + 'api/Quiz/createquestion',obj).subscribe((res) => {
          console.log(res);
          const xcode: string = this.route.snapshot.queryParamMap.get('code');
          Swal.fire("Question Added Successfully");
          this.router.navigate(['/quiz/createquestion'],{ queryParams: { id:res["id"], code:xcode },queryParamsHandling: "merge" });

  }, (err) => {
      console.log(err);
      Swal.fire({
        title: err.status,
        text:err["title"]})
  });
}

//get Quiz Admin Page
GetAdmin(code) {
 return  this.http.get(endpoint + 'api/Quiz/GetAdmin/'+code);
  };

//Start Quiz
StartQuiz(code) {
  return  this.http.get(endpoint + 'api/Host/StartGame/'+code);
   };

//get game
Game(code) {
  return  this.http.get(endpoint + 'api/Play/Game/'+code);
   };

// get hosted games
getHostedGame(code) {
  return  this.http.get(endpoint + 'api/Host/HostedGames/'+code);
   };


// get quiz summary
getQuizSummary(code) {
  return  this.http.get(endpoint + 'api/Host/GetSummary/'+code);
   };


// get quiz summary
getNxtQue(code) {
 return this.http.get(endpoint + 'api/Host/NextQuestion/'+code);
   };


//create question
SubmitAnswer(obj) {
  console.log(obj)
  this.http.post(endpoint + 'api/Play/SubmitAnswer',obj).subscribe((res) => {
          console.log(res);
          const xcode: string = this.route.snapshot.queryParamMap.get('code');
          Swal.fire("Answer Saved Successfully");
          this.router.navigate(['/play/game'],{ queryParams: { code:xcode },queryParamsHandling: "merge" });
  }, (err) => {
      console.log(err);
      Swal.fire({
        title: err.status,
        text:err["title"]})
  });
}
}
