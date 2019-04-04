import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";



@Component ({
  selector: 'app-form-animals',
  templateUrl: './form-animals.component.html',
  styleUrls: ['./form-animals.component.scss'],
})
export class FormAnimalsComponent implements OnInit {
  spss = [{
      key: 'Ballena',
      value: 'whale'
  },
  {
      key: 'Tortuga',
      value: 'turtle',
  },
  {
      key: 'Atún',
      value: 'tuna',
  }];

  form: FormGroup;
  selectedItemForEdit;

  constructor(private formBuilder: FormBuilder,  private dialogRef: MatDialogRef<FormAnimalsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.selectedItemForEdit = data;
  }

  initForm() {
console.log(this.selectedItemForEdit);

    this.form = this.formBuilder.group({
      spp:[this.selectedItemForEdit.spp? this.selectedItemForEdit.spp: 'select', Validators.required],
      name:[this.selectedItemForEdit.name? this.selectedItemForEdit.name: '', Validators.required],
      number: [this.selectedItemForEdit.number? this.selectedItemForEdit.number: '', Validators.required],
      status: [this.selectedItemForEdit.status? this.selectedItemForEdit.status: '', Validators.required],
      date: [this.selectedItemForEdit.date? this.selectedItemForEdit.date: '', Validators.required],
      latitude: [this.selectedItemForEdit.latitude? this.selectedItemForEdit.latitude: '', Validators.required],
      longitude: [this.selectedItemForEdit.longitude? this.selectedItemForEdit.longitude: '', Validators.required],
      picture: [this.selectedItemForEdit.picture? this.selectedItemForEdit.picture: '', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  close() {
    this.dialogRef.close();
  }

  onSaveAnimals() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
  }

}
