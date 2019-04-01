import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrls: ['./menu-btn.component.scss']
})
export class MenuBtnComponent implements OnInit {

  status: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleVisibilityMenuBtns() {
    this.status = !this.status;
  }

}
