import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ocean-friendly';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.getUserLogged && this.authService.token) {
      try {
        this.authService.getUser();
      } catch (err) {
        console.log('getUser error');
      }
    }
  }
}
