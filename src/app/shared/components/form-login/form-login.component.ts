import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Output() save = new EventEmitter();

  form: FormGroup;
  showError: boolean = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormLoginComponent>, private authService: AuthService, private router: Router) { }

  initForm() {

    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    if (this.form.valid) {
      this.showError = false;
      this.authService.login(this.form.value).then(
        response => {
          console.log('login OK', response);
          this.dialogRef.close(response);
          this.router.navigateByUrl('/panel');
        },
        err => {
          console.log('error en el login', err);
          this.showError = true;
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
