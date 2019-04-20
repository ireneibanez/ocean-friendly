import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component ({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {

  showError: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormRegisterComponent>, private authService: AuthService) { }

  initForm() {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', Validators.compose ([Validators.required, Validators.email])],
      password: ['', Validators.required],
      repeat: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    if (this.form.valid) {
      console.log('onSave form ok');
      this.authService.registerUser(this.form.value).then(
        response => {
          this.dialogRef.close();
        },
        err => {
          this.showError = true;
        }
      );
    }
  }
}
