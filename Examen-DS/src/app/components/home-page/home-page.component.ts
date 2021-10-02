import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userLogged: any;
  showProfileModal: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.userLogged = this.userService.getIdentity();
  }

  ngOnInit(): void {
  }

  logOut(){

    localStorage.clear();
    this.router.navigate(['/login'])

  }
}
