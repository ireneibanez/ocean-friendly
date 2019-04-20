import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MapBoxComponent } from '../map/map-box.component';

@Component ({
  selector: 'app-form-animals',
  templateUrl: './form-animals.component.html',
  styleUrls: ['./form-animals.component.scss'],
})
export class FormAnimalsComponent implements OnInit {

  spp: object [] = [{
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
  coordinate: any;

  @ViewChild('map') map: MapBoxComponent;

  constructor(private formBuilder: FormBuilder,  private dialogRef: MatDialogRef<FormAnimalsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.selectedItemForEdit = data;
      console.log(this.selectedItemForEdit);
  }

  initForm() {

    this.coordinate  = {
      lat: this.selectedItemForEdit ? this.selectedItemForEdit.latitude: undefined,
      long: this.selectedItemForEdit ? this.selectedItemForEdit.longitude: undefined
    }

    this.form = this.formBuilder.group({
      spp:[this.selectedItemForEdit ? this.selectedItemForEdit.spp: 'select', Validators.required],
      name:[this.selectedItemForEdit ? this.selectedItemForEdit.name: ''],
      numAnimals: [this.selectedItemForEdit ? this.selectedItemForEdit.numAnimals: '', Validators.required],
      status: [this.selectedItemForEdit ? this.selectedItemForEdit.status: '', Validators.required],
      createdAt: [this.selectedItemForEdit ? this.selectedItemForEdit.createdAt: '', Validators.required],
      latitude: [this.selectedItemForEdit ? this.selectedItemForEdit.latitude: '', Validators.required],
      longitude: [this.selectedItemForEdit ? this.selectedItemForEdit.longitude: '', Validators.required],
      // picture: [this.selectedItemForEdit ? this.selectedItemForEdit.picture: '', Validators.required]
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
  }

  getCoordinates(data) {
    if (data && data.lngLat) {
      let lat = data.lngLat.lat;
      let long = data.lngLat.lng;
      this.form.get('latitude').setValue(lat);
      this.form.get('longitude').setValue(long);
      this.coordinate = { lat:lat, long:long };
    }
  }





}
