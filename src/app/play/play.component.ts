import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
let code;

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router: Router,private restservice:RestService) { }

  ngOnInit() {
    const id: string = this.route.snapshot.queryParamMap.get('id')
    code = id;
   setTimeout(()=>this.checkgamestarted(code),5000);
  }
  checkgamestarted(code){
    console.log(code,"yo")
    this.restservice.CheckGameStatus(code);
    setTimeout(()=>this.checkgamestarted(code),5000)
  }
}
