import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component ({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  @Output() save = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormLoginComponent>) { }

  initForm() {

    this.form = this.formBuilder.group({
      name:['', Validators.required],
      password: ['', Validators.required]
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
