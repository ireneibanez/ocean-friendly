import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormLoginComponent } from '../../form-login/form-login.component';
import { FormRegisterComponent } from '../../form-register/form-register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (public dialog: MatDialog){}

  openFormLogin(){
    this.dialog.open(FormLoginComponent);
  }

  openFormRegister(){
    this.dialog.open(FormRegisterComponent);
  }

  ngOnInit() {
  }

}


