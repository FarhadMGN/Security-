import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../interfaces/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @Input()
  app: Application;

  constructor() { }

  ngOnInit() {
  }

  _insertPassword() {
    console.log(this.app);
    //chrome.storage.local.set({"newPassword": ''});
    //chrome.storage.local.set({'newPassword': this.app.password});
  }
}
