import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Contact App';
  constructor(private appService: AppService, private router: Router) {
  }


  ngOnInit() {
    const userId = document.cookie.split('user-id=');

    if (userId.length < 2) {
      window.location.href = 'https://apicontacts.devotics.io/';
    }
    this.appService.saveUserId(userId[1]);
    this.router.navigate(['contacts']);
  }

}
