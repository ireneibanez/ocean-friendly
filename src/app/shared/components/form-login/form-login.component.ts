import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component ({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Output() save = new EventEmitter();

  form: FormGroup;
  showError: boolean = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormLoginComponent>, private authService: AuthService) { }

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
      this.authService.login(this.form.value).then(
        response => {
          console.log('login OK', response);
          this.dialogRef.close(response);
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
