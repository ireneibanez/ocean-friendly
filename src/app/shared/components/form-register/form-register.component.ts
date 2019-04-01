import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component ({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {

  @Output() save = new EventEmitter();

  name = new FormControl('');

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormRegisterComponent>) { }

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

  onSave(value) {
    // this.save.emit(value);
    // this.form.reset();
    this.dialogRef.close();
  }
}
