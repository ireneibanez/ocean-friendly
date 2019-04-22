import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormLoginComponent } from '../../form-login/form-login.component';
import { FormRegisterComponent } from '../../form-register/form-register.component';
import { User } from 'src/app/model/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userLogged: User;
  private userLoggedSubscription: Subscription;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    this.userLoggedSubscription = this.authService.userLoggedObservable.subscribe(
      user => {
        this.userLogged = user;
      }
    )
  }

  ngOnDestroy() {
    if (this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

  openFormLogin(){
    this.dialog.open(FormLoginComponent);
  }

  openFormRegister(){
    this.dialog.open(FormRegisterComponent);
  }

  closeSession() {
    this.authService.token = null;
    this.userLogged = null;
  }
}


