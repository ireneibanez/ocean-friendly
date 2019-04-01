import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component ({
  selector: 'app-form-animals',
  templateUrl: './form-animals.component.html',
  styleUrls: ['./form-animals.component.scss'],
})
export class FormAnimalsComponent implements OnInit {


  spss = [{
      key: 'Ballena',
      value: '1'
  },
  {
      key: 'Tortuga',
      value: '2',
  },
  {
      key: 'Atún',
      value: '3',
  }];


  @Output() save = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  initForm() {

    this.form = this.formBuilder.group({
      name:['', Validators.required],
      number: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
      latitud: [{value: '', disabled: true}, Validators.required],
      longitud: [{value: '', disabled: true}, Validators.required],
      picture: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSaveAnimals(value) {
    // this.save.emit(value);
    // this.form.reset();

  }
}
