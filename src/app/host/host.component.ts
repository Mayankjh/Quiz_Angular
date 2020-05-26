import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  games;
  constructor(private router: Router,private restservice: RestService) { }

  ngOnInit() {
    var id = localStorage.getItem('userid') 
    this.restservice.getHostedGame(id).subscribe((res) => {
      console.log(res);
      this.games = res;
      }, (err) => {
    console.log(err)
  });
  }

QuizSetup(code){
  this.router.navigate(['/quiz/admin'],{ queryParams: { code:code },queryParamsHandling: "merge" });

}
StartGame(code){
  this.router.navigate(['/host/details'],{ queryParams: { code:code },queryParamsHandling: "merge" });
}
getsummary(code){
  this.router.navigate(['/quiz/summary'],{ queryParams: { code:code },queryParamsHandling: "merge" });

}

}
