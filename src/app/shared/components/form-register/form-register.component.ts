import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

@Component ({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {

  showError: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormRegisterComponent>, private authService: AuthService, private dialog: MatDialog) { }

  initForm() {
    this.form = this.formBuilder.group({
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
      this.authService.registerUser(this.form.value).then(
        response => {
          this.dialogRef.close();
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = 'Se ha registrado correctamente, ya puede iniciar sesión.';
          dialogConfig.disableClose = true;
          this.dialog.open(DialogMessageComponent, dialogConfig);
        },
        err => {
          this.showError = true;
        }
      );
    }
  }
}
