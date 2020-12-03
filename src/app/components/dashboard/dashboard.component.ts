import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: SocialUser;
  
  constructor(
    private router: Router, 
    private authService: AuthService) { }

  ngOnInit(): void {
    let user: SocialUser = this.authService.getSocialUser();
    console.log(`user: ${user}`)
    if (user != undefined) {
      this.user = user;
    }
  }

}
