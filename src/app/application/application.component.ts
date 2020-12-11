import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../interfaces/application';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @Input()
  app: Application;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  _insertPassword() {
    console.log(this.app);
    this.http.get('http://localhost:8080/api/userInfo?relatedURL=' + this.app.relatedURL + '&login=' + this.app.login)
      .subscribe((res: Application) => {
        console.log('res after pswd request = ', res);
        chrome.storage.local.set({"newPassword": ''});
        chrome.storage.local.set({'newPassword': res.password});
      },
        (err) => {
          console.log('err after pswd request is ', err);
        });
  }
}
