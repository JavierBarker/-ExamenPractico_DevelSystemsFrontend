import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public idPoll: any;
  public token = "";
  public getResultsPollIdVar: any;
  public getPollIdVar: any;

  constructor(
    private userService: UserService, 
    private resultService: ResultService, 
    private activatedRoute: ActivatedRoute,
    private pollService: PollService
  ) {
    this.token = this.userService.getToken();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((dataRoute) => {
      this.idPoll = dataRoute.get('id');
    })

    this.getResultsByPoll(this.idPoll);
    this.getPollId(this.idPoll);
  }

  getResultsByPoll(id: string){
    this.resultService.getResultsPoll(id, this.token).subscribe(
      response=>{
        this.getResultsPollIdVar = response;
        console.log(this.getResultsPollIdVar);
      }
    )
  }

  getPollId(id: string){
    this.pollService.getPollId(id).subscribe(
      response =>{
        this.getPollIdVar = response;
        console.log(this.getPollIdVar);
      }
    )
  }
}
